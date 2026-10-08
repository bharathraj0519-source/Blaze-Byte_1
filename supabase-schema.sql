-- ========================================================================
-- BLAZEBYTE STUDIO — SUPABASE DATABASE CONFIGURATION & SEPARATE ENQUIRIES TABLE
-- Project: https://ssbxolloyyvlbuefyhda.supabase.co
-- Execute this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/ssbxolloyyvlbuefyhda/sql
-- ========================================================================

-- 1. Ensure the existing customer_requests table allows anonymous submissions
ALTER TABLE IF EXISTS public.customer_requests ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'customer_requests' AND policyname = 'Allow public anonymous inserts'
  ) THEN
    CREATE POLICY "Allow public anonymous inserts"
    ON public.customer_requests
    FOR INSERT
    TO anon
    WITH CHECK (true);
  END IF;
END $$;

-- 2. Create dedicated, separate table for International Project Enquiries
CREATE TABLE IF NOT EXISTS public.project_enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_number TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    business_email TEXT NOT NULL,
    company_name TEXT,
    country TEXT,
    service_interested TEXT NOT NULL,
    estimated_budget TEXT NOT NULL,
    expected_timeline TEXT,
    preferred_contact TEXT,
    phone_number TEXT,
    project_description TEXT NOT NULL,
    milestone_deposit_acknowledged BOOLEAN DEFAULT TRUE,
    deposit_amount_estimate TEXT,
    status TEXT DEFAULT 'pending_review',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) on the separate table
ALTER TABLE public.project_enquiries ENABLE ROW LEVEL SECURITY;

-- Allow anonymous visitors to submit enquiries into the separate table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'project_enquiries' AND policyname = 'Allow anonymous project enquiry inserts'
  ) THEN
    CREATE POLICY "Allow anonymous project enquiry inserts"
    ON public.project_enquiries
    FOR INSERT
    TO anon
    WITH CHECK (true);
  END IF;
END $$;

-- Allow authenticated admins (BlazeByte team dashboard) to read all submissions
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'project_enquiries' AND policyname = 'Allow authenticated read project enquiries'
  ) THEN
    CREATE POLICY "Allow authenticated read project enquiries"
    ON public.project_enquiries
    FOR SELECT
    TO authenticated
    USING (true);
  END IF;
END $$;
