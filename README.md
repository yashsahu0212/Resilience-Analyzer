# Resilience Analyzer

*A Password Security Assessment Tool* built for Hackathon **Cyber Carnival 2026**.

## 👥 Team: InfoSec Innovators (Batch 2025)
* **Pranshu Agarwal** (25BAI11526)
* **Harsh Jain** (25BCE10022)
* **Mutta Ganesh Kumar** (25BAI10489)
* **Yash Sahu** (25BCE10051)

---

##  Problem Statement
Password Security Assessment & Resilience Analyzer.

##  Proposed Solution
A real-time "Resilience Analyzer" web application that evaluates password strength instantly as the user types. Instead of just saying "Weak," it calculates the estimated time for a hacker to "brute-force" crack the password.

##  Key Features & Innovation
* **Real-Time Analysis:** Uses an algorithm to analyze length, character variety (symbols, numbers, caps), and randomness.
* **Gamification:** A visual meter that changes color based on resilience.
* **Educational Pop-ups:** Context-aware tooltips that explain why certain patterns (like "123") are dangerous, directly educating the user.
* **Privacy First (Client-Side First):** All core analysis runs in the browser—no password leaves the device.
* **Secure Breach Checking:** Utilizes k-anonymity to securely check the HaveIBeenPwned API by sending only the first 5 characters of a SHA-1 hash.

##  Technical Stack
* **Frontend:** HTML5, CSS3, JavaScript
* **Core Libraries:** * `zxcvbn` (by Dropbox) - Password strength estimation
  * `crypto-js` - Client-side hashing for breach checks
* **External APIs:** HaveIBeenPwned API (v3)

##  How to Run Locally
1. Clone this repository to your local machine.
2. Open the project folder in your preferred code editor (e.g., Visual Studio Code).
3. Start a local development server (like the "Live Server" extension in VS Code).
4. The application will open automatically in your default web browser.

##  Impact
This tool empowers individuals to protect their online identities and reduces the risk of account takeovers by stopping users from setting weak passwords.
