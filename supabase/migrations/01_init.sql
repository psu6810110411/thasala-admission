-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create APPLICANTS table
CREATE TABLE applicants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_no VARCHAR(20) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    
    -- Persona & Program
    persona VARCHAR(20) NOT NULL,
    level VARCHAR(5) NOT NULL,
    primary_program VARCHAR(50) NOT NULL,
    secondary_program VARCHAR(50),
    gpax DECIMAL(3,2),
    gpax_math_sci DECIMAL(3,2),
    
    -- Personal Info
    citizen_id VARCHAR(13) UNIQUE NOT NULL,
    title VARCHAR(20) NOT NULL,
    first_name_th VARCHAR(100) NOT NULL,
    last_name_th VARCHAR(100) NOT NULL,
    first_name_en VARCHAR(100),
    last_name_en VARCHAR(100),
    birth_date DATE NOT NULL,
    gender VARCHAR(10) NOT NULL,
    religion VARCHAR(50),
    blood_type VARCHAR(5),
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    
    -- Parent Info
    parent_relation VARCHAR(50),
    parent_full_name VARCHAR(150),
    parent_phone VARCHAR(20),
    parent_occupation VARCHAR(100),
    
    -- School & Address
    previous_school VARCHAR(150) NOT NULL,
    previous_school_province VARCHAR(100),
    address_house_no VARCHAR(50),
    address_moo VARCHAR(10),
    address_subdistrict VARCHAR(100),
    address_district VARCHAR(100),
    address_province VARCHAR(100),
    
    -- Timestamps
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create DOCUMENTS table
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    applicant_id UUID REFERENCES applicants(id) ON DELETE CASCADE,
    doc_type VARCHAR(50) NOT NULL, -- e.g. 'photo', 'transcript_front', 'transcript_back', 'house_reg'
    file_url TEXT NOT NULL,
    uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create EXAM_ROOMS table
CREATE TABLE exam_rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_name VARCHAR(50) UNIQUE NOT NULL,
    capacity INT NOT NULL DEFAULT 30,
    current_count INT NOT NULL DEFAULT 0,
    level VARCHAR(5) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE applicants ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_rooms ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS Policies
-- Allow anyone to insert (Apply form)
CREATE POLICY "Allow public insert to applicants" ON applicants FOR INSERT WITH CHECK (true);
-- Allow users to read their own application via citizen_id (we'll query via RPC or specific match)
CREATE POLICY "Allow read own applicant" ON applicants FOR SELECT USING (true); 
-- Allow public insert to documents
CREATE POLICY "Allow public insert to documents" ON documents FOR INSERT WITH CHECK (true);
-- Allow public read to exam rooms
CREATE POLICY "Allow public read to exam rooms" ON exam_rooms FOR SELECT USING (true);

-- 6. Setup Storage Buckets for Documents
INSERT INTO storage.buckets (id, name, public) VALUES ('applicant_docs', 'applicant_docs', false) ON CONFLICT DO NOTHING;

-- Allow public to upload files
CREATE POLICY "Allow public file upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'applicant_docs');
