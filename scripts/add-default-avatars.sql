-- Add default avatar URLs to test users
-- These use placeholder avatar services that generate avatars based on names

-- Individual profiles with avatar URLs
UPDATE profiles SET avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=JohnDoe&backgroundColor=3B82F6' 
WHERE username = 'johndoe' AND profile_type = 'individual';

UPDATE profiles SET avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahWilson&backgroundColor=EC4899' 
WHERE username = 'sarahwilson' AND profile_type = 'individual';

UPDATE profiles SET avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=MikeChen&backgroundColor=10B981' 
WHERE username = 'mikechen' AND profile_type = 'individual';

UPDATE profiles SET avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=LisaPark&backgroundColor=F59E0B' 
WHERE username = 'lisapark' AND profile_type = 'individual';

UPDATE profiles SET avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=DavidKumar&backgroundColor=8B5CF6' 
WHERE username = 'davidkumar' AND profile_type = 'individual';

-- Company profiles with logo-style avatars
UPDATE profiles SET avatar_url = 'https://api.dicebear.com/7.x/initials/svg?seed=TechStartup&backgroundColor=1F2937&textColor=ffffff' 
WHERE username = 'techstartup' AND profile_type = 'company';

UPDATE profiles SET avatar_url = 'https://api.dicebear.com/7.x/initials/svg?seed=CreativeDesign&backgroundColor=DC2626&textColor=ffffff' 
WHERE username = 'designstudio' AND profile_type = 'company';

UPDATE profiles SET avatar_url = 'https://api.dicebear.com/7.x/initials/svg?seed=GreenEnergy&backgroundColor=059669&textColor=ffffff' 
WHERE username = 'greenenergy' AND profile_type = 'company';

