-- Politiche RLS per la tabella hero
ALTER TABLE hero ENABLE ROW LEVEL SECURITY;

-- Consenti a tutti di leggere
CREATE POLICY "Consenti a tutti di leggere hero" ON hero
  FOR SELECT USING (true);

-- Consenti agli utenti autenticati di inserire, aggiornare ed eliminare
CREATE POLICY "Consenti agli utenti autenticati di inserire hero" ON hero
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Consenti agli utenti autenticati di aggiornare hero" ON hero
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Consenti agli utenti autenticati di eliminare hero" ON hero
  FOR DELETE USING (auth.role() = 'authenticated');

-- Politiche RLS per la tabella about_me
ALTER TABLE about_me ENABLE ROW LEVEL SECURITY;

-- Consenti a tutti di leggere
CREATE POLICY "Consenti a tutti di leggere about_me" ON about_me
  FOR SELECT USING (true);

-- Consenti agli utenti autenticati di inserire, aggiornare ed eliminare
CREATE POLICY "Consenti agli utenti autenticati di inserire about_me" ON about_me
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Consenti agli utenti autenticati di aggiornare about_me" ON about_me
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Consenti agli utenti autenticati di eliminare about_me" ON about_me
  FOR DELETE USING (auth.role() = 'authenticated');

-- Politiche RLS per la tabella services
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Consenti a tutti di leggere
CREATE POLICY "Consenti a tutti di leggere services" ON services
  FOR SELECT USING (true);

-- Consenti agli utenti autenticati di inserire, aggiornare ed eliminare
CREATE POLICY "Consenti agli utenti autenticati di inserire services" ON services
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Consenti agli utenti autenticati di aggiornare services" ON services
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Consenti agli utenti autenticati di eliminare services" ON services
  FOR DELETE USING (auth.role() = 'authenticated');

-- Politiche RLS per la tabella testimonials
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Consenti a tutti di leggere
CREATE POLICY "Consenti a tutti di leggere testimonials" ON testimonials
  FOR SELECT USING (true);

-- Consenti agli utenti autenticati di inserire, aggiornare ed eliminare
CREATE POLICY "Consenti agli utenti autenticati di inserire testimonials" ON testimonials
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Consenti agli utenti autenticati di aggiornare testimonials" ON testimonials
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Consenti agli utenti autenticati di eliminare testimonials" ON testimonials
  FOR DELETE USING (auth.role() = 'authenticated');

-- Politiche RLS per la tabella gallery
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Consenti a tutti di leggere
CREATE POLICY "Consenti a tutti di leggere gallery" ON gallery
  FOR SELECT USING (true);

-- Consenti agli utenti autenticati di inserire, aggiornare ed eliminare
CREATE POLICY "Consenti agli utenti autenticati di inserire gallery" ON gallery
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Consenti agli utenti autenticati di aggiornare gallery" ON gallery
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Consenti agli utenti autenticati di eliminare gallery" ON gallery
  FOR DELETE USING (auth.role() = 'authenticated');

-- Politiche RLS per la tabella location
ALTER TABLE location ENABLE ROW LEVEL SECURITY;

-- Consenti a tutti di leggere
CREATE POLICY "Consenti a tutti di leggere location" ON location
  FOR SELECT USING (true);

-- Consenti agli utenti autenticati di inserire, aggiornare ed eliminare
CREATE POLICY "Consenti agli utenti autenticati di inserire location" ON location
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Consenti agli utenti autenticati di aggiornare location" ON location
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Consenti agli utenti autenticati di eliminare location" ON location
  FOR DELETE USING (auth.role() = 'authenticated');

-- Politiche RLS per la tabella contact_info
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;

-- Consenti a tutti di leggere
CREATE POLICY "Consenti a tutti di leggere contact_info" ON contact_info
  FOR SELECT USING (true);

-- Consenti agli utenti autenticati di inserire, aggiornare ed eliminare
CREATE POLICY "Consenti agli utenti autenticati di inserire contact_info" ON contact_info
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Consenti agli utenti autenticati di aggiornare contact_info" ON contact_info
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Consenti agli utenti autenticati di eliminare contact_info" ON contact_info
  FOR DELETE USING (auth.role() = 'authenticated');

-- Politiche RLS per la tabella styles
ALTER TABLE styles ENABLE ROW LEVEL SECURITY;

-- Consenti a tutti di leggere
CREATE POLICY "Consenti a tutti di leggere styles" ON styles
  FOR SELECT USING (true);

-- Consenti agli utenti autenticati di inserire, aggiornare ed eliminare
CREATE POLICY "Consenti agli utenti autenticati di inserire styles" ON styles
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Consenti agli utenti autenticati di aggiornare styles" ON styles
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Consenti agli utenti autenticati di eliminare styles" ON styles
  FOR DELETE USING (auth.role() = 'authenticated');

-- Politiche RLS per lo storage
-- Nota: Le policy per lo storage devono essere configurate nell'interfaccia di Supabase
-- Ecco un esempio di come dovrebbero essere configurate:

-- Per il bucket 'images':
-- 1. Policy per consentire a tutti di leggere:
--    - Nome: "Consenti a tutti di leggere immagini"
--    - Definizione: storage.foldername(name) = 'images'
--    - Operazione: SELECT
--    - Utilizzando l'espressione: true

-- 2. Policy per consentire agli utenti autenticati di caricare immagini:
--    - Nome: "Consenti agli utenti autenticati di caricare immagini"
--    - Definizione: storage.foldername(name) = 'images'
--    - Operazione: INSERT
--    - Utilizzando l'espressione: (auth.role() = 'authenticated')

-- 3. Policy per consentire agli utenti autenticati di aggiornare immagini:
--    - Nome: "Consenti agli utenti autenticati di aggiornare immagini"
--    - Definizione: storage.foldername(name) = 'images'
--    - Operazione: UPDATE
--    - Utilizzando l'espressione: (auth.role() = 'authenticated')

-- 4. Policy per consentire agli utenti autenticati di eliminare immagini:
--    - Nome: "Consenti agli utenti autenticati di eliminare immagini"
--    - Definizione: storage.foldername(name) = 'images'
--    - Operazione: DELETE
--    - Utilizzando l'espressione: (auth.role() = 'authenticated')
