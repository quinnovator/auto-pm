-- Create features table
CREATE TABLE public.features (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  business_value TEXT NOT NULL,
  user_benefit TEXT NOT NULL,
  state TEXT NOT NULL CHECK (state IN ('REFINEMENT', 'PROPOSED', 'IMPLEMENTED')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create index on application_id for faster queries
CREATE INDEX idx_features_application_id ON public.features(application_id);

-- Enable Row Level Security
ALTER TABLE public.features ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to see features of their own applications
CREATE POLICY "Users can view features of their own applications" ON public.features
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM public.applications WHERE id = features.application_id
    )
  );

-- Create policy to allow users to insert features for their own applications
CREATE POLICY "Users can insert features for their own applications" ON public.features
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM public.applications WHERE id = features.application_id
    )
  );

-- Create policy to allow users to update features of their own applications
CREATE POLICY "Users can update features of their own applications" ON public.features
  FOR UPDATE USING (
    auth.uid() IN (
      SELECT user_id FROM public.applications WHERE id = features.application_id
    )
  );

-- Create policy to allow users to delete features of their own applications
CREATE POLICY "Users can delete features of their own applications" ON public.features
  FOR DELETE USING (
    auth.uid() IN (
      SELECT user_id FROM public.applications WHERE id = features.application_id
    )
  );
