-- Create user_personas table
CREATE TABLE public.user_personas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  job_title TEXT NOT NULL,
  day_to_day_description TEXT NOT NULL,
  important_factors TEXT NOT NULL,
  application_satisfaction INTEGER NOT NULL CHECK (application_satisfaction BETWEEN 1 AND 10),
  pain_points TEXT,
  goals TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create index on application_id for faster queries
CREATE INDEX idx_user_personas_application_id ON public.user_personas(application_id);

-- Enable Row Level Security
ALTER TABLE public.user_personas ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to see user personas of their own applications
CREATE POLICY "Users can view user personas of their own applications" ON public.user_personas
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM public.applications WHERE id = user_personas.application_id
    )
  );

-- Create policy to allow users to insert user personas for their own applications
CREATE POLICY "Users can insert user personas for their own applications" ON public.user_personas
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM public.applications WHERE id = user_personas.application_id
    )
  );

-- Create policy to allow users to update user personas of their own applications
CREATE POLICY "Users can update user personas of their own applications" ON public.user_personas
  FOR UPDATE USING (
    auth.uid() IN (
      SELECT user_id FROM public.applications WHERE id = user_personas.application_id
    )
  );

-- Create policy to allow users to delete user personas of their own applications
CREATE POLICY "Users can delete user personas of their own applications" ON public.user_personas
  FOR DELETE USING (
    auth.uid() IN (
      SELECT user_id FROM public.applications WHERE id = user_personas.application_id
    )
  );
