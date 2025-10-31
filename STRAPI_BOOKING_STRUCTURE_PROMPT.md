# Buat Content Types untuk Tour Package Booking System di Strapi

Buat struktur Content Types berikut di Strapi sesuai dengan kebutuhan booking page:

## 1. Content Type: Tour Package (tour-package)

**Fields:**
- title (Text, Required)
- subtitle (Text)
- description (Rich Text)
- location (Text, Required)
- duration (Text, Required) - contoh: "3 Hari 2 Malam"
- groupSize (Text) - contoh: "2-8 Orang"
- price (Number, Required)
- originalPrice (Number)
- discount (Number)
- rating (Decimal)
- reviewsCount (Number)
- isActive (Boolean, Default: true)
- isFeatured (Boolean, Default: false)
- slug (UID, Target Field: title)
- highlights (JSON) - array of strings
- gallery (Media, Multiple)
- heroImage (Media)
- itinerary (Component, Multiple - Itinerary Day)
- inclusions (Component, Multiple - Inclusion Category)
- exclusions (JSON) - array of strings
- reviews (Relation, Many-to-Many - Review)
- recommendations (Relation, Many-to-Many - Tour Package)
- importantNotes (Rich Text)
- cancellationPolicy (Text)
- bookingPolicy (Text)

## 2. Component: Itinerary Day

**Fields:**
- day (Number, Required)
- title (Text, Required)
- activities (Component, Multiple - Itinerary Activity)

## 3. Component: Itinerary Activity

**Fields:**
- time (Time, Required) - contoh: "08:00"
- title (Text, Required)
- description (Text)
- location (Text)
- duration (Text) - contoh: "2 jam"

## 4. Component: Inclusion Category

**Fields:**
- title (Text, Required)
- icon (Text) - nama icon dari lucide-react
- items (JSON) - array of strings

## 5. Content Type: Review

**Fields:**
- user (Component - User)
- rating (Integer, Required, Min: 1, Max: 5)
- title (Text, Required)
- content (Text, Required)
- helpful (Number, Default: 0)
- verified (Boolean, Default: false)
- package (Relation, Many-to-One - Tour Package)
- date (DateTime, Required)

## 6. Component: User

**Fields:**
- name (Text, Required)
- avatar (Media)
- location (Text)

## 7. Content Type: Booking

**Fields:**
- package (Relation, Many-to-One - Tour Package, Required)
- customer (Component - Customer, Required)
- bookingData (Component - Booking Data, Required)
- paymentData (Component - Payment Data)
- status (Enumeration, Required) - Values: pending, confirmed, cancelled, completed (Default: pending)
- totalPrice (Number, Required)
- bookingDate (DateTime, Required)
- checkInDate (Date, Required)
- checkOutDate (Date, Required)
- guests (Number, Required)
- specialRequests (Text)

## 8. Component: Customer

**Fields:**
- fullName (Text, Required)
- email (Email, Required)
- phone (Text, Required)
- emergencyContact (Text)
- emergencyPhone (Text)

## 9. Component: Booking Data

**Fields:**
- departureDate (Date, Required)
- returnDate (Date, Required)
- totalGuests (Number, Required)
- specialRequests (Text)

## 10. Component: Payment Data

**Fields:**
- method (Enumeration, Required) - Values: credit_card, bank_transfer, ewallet, virtual_account
- status (Enumeration, Required) - Values: pending, completed, failed, refunded (Default: pending)
- transactionId (Text)
- amount (Number, Required)
- processingFee (Number, Default: 0)

## Notes:
- Set permissions untuk semua Content Types agar bisa diakses via API
- Gunakan populate parameter untuk mendapatkan relasi lengkap
- Pastikan semua field Required memiliki validasi yang tepat
- Untuk JSON fields (highlights, exclusions, items), simpan sebagai array of strings
