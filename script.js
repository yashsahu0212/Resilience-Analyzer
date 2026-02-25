const passwordInput = document.getElementById('passwordInput');
const meterFill = document.getElementById('meterFill');
const strengthText = document.getElementById('strengthText');
const crackTimeText = document.getElementById('crackTimeText');
const eduPopup = document.getElementById('eduPopup');
const breachAlert = document.getElementById('breachAlert');
const togglePassword = document.getElementById('togglePassword');
const eyeIcon = document.getElementById('eyeIcon');
const generateRandomBtn = document.getElementById('generateRandomBtn');
const customWordInput = document.getElementById('customWordInput');
const generateFromWordBtn = document.getElementById('generateFromWordBtn');

togglePassword.addEventListener('click', function () {
    const isPasswordHidden = passwordInput.getAttribute('type') === 'password';
    
    if (isPasswordHidden) {
        passwordInput.setAttribute('type', 'text');
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.setAttribute('type', 'password');
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }
});

function generateRandomPassword(length = 16) {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const allChars = uppercase + lowercase + numbers + symbols;
    
    let password = '';
    
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];
    
    for (let i = password.length; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    
    return password.split('').sort(() => Math.random() - 0.5).join('');
}

function generateFromWord(input) {
    if (!input || input.trim() === '') {
        return '';
    }
    
    const words = input.trim().split(/\s+/);
    const symbols = ['!', '@', '#', '$', '%', '^', '&', '*'];
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    
    let result = '';
    
    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        word = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        
        const numPrefix = numbers[Math.floor(Math.random() * numbers.length)];
        const symPrefix = symbols[Math.floor(Math.random() * symbols.length)];
        const numSuffix = numbers[Math.floor(Math.random() * numbers.length)];
        const symSuffix = symbols[Math.floor(Math.random() * symbols.length)];
        
        result += numPrefix + symPrefix + word + symSuffix + numSuffix;
        
        if (i < words.length - 1) {
            const sepSym = symbols[Math.floor(Math.random() * symbols.length)];
            const sepNum = numbers[Math.floor(Math.random() * numbers.length)];
            result += sepSym + sepNum;
        }
    }
    
    const extraUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const extraLower = 'abcdefghijklmnopqrstuvwxyz';
    const extraNum = numbers[Math.floor(Math.random() * numbers.length)];
    const extraSym = symbols[Math.floor(Math.random() * symbols.length)];
    
    result = extraUpper[Math.floor(Math.random() * extraUpper.length)] + 
             result + 
             extraLower[Math.floor(Math.random() * extraLower.length)] +
             extraNum + extraSym;
    
    return result.substring(0, 12);
}

generateRandomBtn.addEventListener('click', function() {
    const randomPassword = generateRandomPassword(16);
    passwordInput.value = randomPassword;
    passwordInput.dispatchEvent(new Event('input'));
    passwordInput.setAttribute('type', 'text');
    eyeIcon.classList.remove('fa-eye');
    eyeIcon.classList.add('fa-eye-slash');
});

generateFromWordBtn.addEventListener('click', function() {
    const word = customWordInput.value;
    
    if (!word || word.trim() === '') {
        customWordInput.focus();
        customWordInput.style.borderColor = '#F87171';
        setTimeout(() => {
            customWordInput.style.borderColor = '#4a4a5e';
        }, 2000);
        return;
    }
    
    const generatedPassword = generateFromWord(word);
    passwordInput.value = generatedPassword;
    passwordInput.dispatchEvent(new Event('input'));
    passwordInput.setAttribute('type', 'text');
    eyeIcon.classList.remove('fa-eye');
    eyeIcon.classList.add('fa-eye-slash');
});

const strengthColors = ['#F87171', '#FBBF24', '#A78BFA', '#4ECDC4', '#34D399'];
const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];

function calculateCustomStrength(password) {
    let score = 0;
    
    if (password.length > 20) {
        return { score: -1, message: 'Password exceeds 20 character limit' };
    }
    
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password);
    
    if (hasUppercase) score += 1;
    if (hasLowercase) score += 1;
    if (hasNumbers) score += 2;
    if (hasSymbols) score += 3;
    
    const hasNumberWordCombo = /[a-zA-Z]+[0-9]|[0-9]+[a-zA-Z]/.test(password);
    if (hasNumberWordCombo) score += 5;
    
    const hasNumberAttachedToWord = /[0-9]{2,}[a-zA-Z]|[a-zA-Z][0-9]{2,}|[a-zA-Z]\s[0-9]{2,}|[0-9]{2,}\s[a-zA-Z]|[a-zA-Z][!@#$%^&*()_+\-=\[\]{}|;:,.<>?]*[0-9]{2,}|[0-9]{2,}[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]*[a-zA-Z]/.test(password);
    if (hasNumberAttachedToWord) score += 3;
    
    const uniqueSymbols = password.match(/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/g) || [];
    const uniqueSymbolCount = [...new Set(uniqueSymbols)].length;
    if (uniqueSymbolCount >= 2) score += 3;
    if (uniqueSymbolCount >= 3) score += 2;
    
    const hasWordSymbolCombo = /[a-zA-Z]+[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]|[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]+[a-zA-Z]/.test(password);
    if (hasWordSymbolCombo) score += 4;
    
    const lengthContribution = Math.min(password.length, 12) * 0.2;
    score += lengthContribution;
    
    if (password.toLowerCase().includes('password')) score -= 5;
    if (password.includes('123') || password.includes('abc')) score -= 2;
    if (/^[0-9]+$/.test(password)) score -= 2;
    if (/^[a-zA-Z]+$/.test(password)) score -= 1;
    
    let finalScore = Math.round(score / 4);
    finalScore = Math.max(0, Math.min(4, finalScore));
    
    return { score: finalScore, message: strengthLabels[finalScore] };
}

passwordInput.addEventListener('input', function() {
    const password = this.value;
    
    if (!password) {
        meterFill.style.width = '0%';
        strengthText.innerText = 'Strength: None';
        strengthText.style.color = '#a0a0b8';
        crackTimeText.innerText = 'Time to crack: Instant';
        eduPopup.style.display = 'none';
        breachAlert.style.display = 'none';
        return;
    }

    if (password.length > 20) {
        meterFill.style.width = '100%';
        meterFill.style.backgroundColor = strengthColors[0];
        strengthText.innerText = 'Strength: Too Long';
        strengthText.style.color = strengthColors[0];
        crackTimeText.innerText = 'Max 20 characters allowed';
        eduPopup.innerText = 'Keep your password under 20 characters for better security analysis.';
        eduPopup.style.display = 'block';
        breachAlert.style.display = 'none';
        return;
    }

    const customResult = calculateCustomStrength(password);
    const score = customResult.score;
    
    meterFill.style.width = ((score + 1) * 20) + '%';
    meterFill.style.backgroundColor = strengthColors[score];
    
    strengthText.innerText = `Strength: ${strengthLabels[score]}`;
    strengthText.style.color = strengthColors[score]; 
    
    const crackTimes = ['Instant', 'Few seconds', 'Hours', 'Days', 'Years'];
    crackTimeText.innerText = `Time to crack: ${crackTimes[score]}`;

    if (password.includes('123') || password.toLowerCase().includes('password')) {
        eduPopup.innerText = "Tip: Distinct patterns like '123' or 'password' are highly dangerous and instantly guessed by brute-force tools.";
        eduPopup.style.display = 'block';
    } else if (password.length > 0 && !(/[0-9]/.test(password)) && !(/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password))) {
        eduPopup.innerText = "Tip: Add numbers and symbols to make your password stronger!";
        eduPopup.style.display = 'block';
    } else if (password.length > 0 && !(/[a-zA-Z]/.test(password))) {
        eduPopup.innerText = "Tip: Add letters to create a memorable word-based password!";
        eduPopup.style.display = 'block';
    } else if (score < 3) {
        eduPopup.innerText = "Tip: Mix words with numbers and symbols for maximum strength!";
        eduPopup.style.display = 'block';
    } else {
        eduPopup.style.display = 'none';
    }

    checkBreach(password);
});

async function checkBreach(password) {
    const hash = CryptoJS.SHA1(password).toString(CryptoJS.enc.Hex).toUpperCase();
    const prefix = hash.substring(0, 5);
    const suffix = hash.substring(5);

    try {
        const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
        if (response.ok) {
            const text = await response.text();
            const hashes = text.split('\n');
            
            let isBreached = false;
            let breachCount = 0;

            for (let line of hashes) {
                const [hashSuffix, count] = line.split(':');
                if (hashSuffix === suffix) {
                    isBreached = true;
                    breachCount = count.trim();
                    break;
                }
            }

            if (isBreached) {
                breachAlert.innerHTML = `Alert: This password has been exposed in ${parseInt(breachCount).toLocaleString()} data breaches! Please change it.`;
                breachAlert.style.display = 'block';
            } else {
                breachAlert.style.display = 'none';
            }
        }
    } catch (error) {
        console.error("Error checking breach API:", error);
    }
}
