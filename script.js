// ==================== LOGIKA GANTI TEMA (DARK / LIGHT MODE) ====================
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
const themeText = document.getElementById('theme-text');
const themeTextMobile = document.getElementById('theme-text-mobile');
const htmlEl = document.documentElement;

// Cek preferensi tema tersimpan di localStorage (default: dark)
if (localStorage.getItem('theme') === 'light') {
    htmlEl.classList.remove('dark');
    if (themeText) themeText.textContent = '🌙 Gelap';
    if (themeTextMobile) themeTextMobile.textContent = '🌙';
} else {
    htmlEl.classList.add('dark');
    if (themeText) themeText.textContent = '☀️ Terang';
    if (themeTextMobile) themeTextMobile.textContent = '☀️';
}

function toggleTheme() {
    htmlEl.classList.toggle('dark');
    
    if (htmlEl.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        if (themeText) themeText.textContent = '☀️ Terang';
        if (themeTextMobile) themeTextMobile.textContent = '☀️';
    } else {
        localStorage.setItem('theme', 'light');
        if (themeText) themeText.textContent = '🌙 Gelap';
        if (themeTextMobile) themeTextMobile.textContent = '🌙';
    }
}

if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
if (themeToggleMobileBtn) themeToggleMobileBtn.addEventListener('click', toggleTheme);


// ==================== DATA MOBIL ====================
const carsData = [
    {
        id: 1,
        name: "Toyota Rush TRD Sportivo",
        category: "suv",
        price: "Rp 295.000.000",
        priceVal: 295000000,
        image: "816A9934-2.jpg",
        specs: { 
            engine: "1.5L 4-Cylinder Dual VVT-i", 
            power: "104 PS", 
            transmission: "4-Speed Automatic / 5-Speed Manual", 
            fuel: "Bensin" 
        }
    },
    {
        id: 2,
        name: "Toyota Fortuner GR Sport",
        category: "gr",
        price: "Rp 726.000.000",
        priceVal: 726000000,
        image: "toyota-fortuner.avif",
        specs: { 
            engine: "2.7L 4-Cylinder in-line", 
            power: "201 HP", 
            transmission: "6-Speed Automatic", 
            fuel: "Diesel" 
        }
    },
    {
        id: 3,
        name: "Toyota Innova Zenix Hybrid",
        category: "hybrid",
        price: "Rp 477.000.000",
        priceVal: 477000000,
        image: "toyota.webp",
        specs: { 
            engine: "2.0L Dual VVT-i Hybrid", 
            power: "186 HP (Total)", 
            transmission: "e-CVT", 
            fuel: "Bensin (minimal RON 92)" 
        }
    },
    {
        id: 4,
        name: "Toyota Camry Hybrid",
        category: "sedan",
        price: "Rp 945.000.000",
        priceVal: 945000000,
        image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=600&q=80",
        specs: { 
            engine: "2.5L 4-Cylinder Hybrid", 
            power: "208 HP", 
            transmission: "CVT", 
            fuel: "Bensin (minimal RON 92)" 
        }
    }
];


// ==================== DOM ELEMENTS ====================
const mobileMenuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const carGrid = document.getElementById('car-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const selectCarTarget = document.getElementById('select-car-target');

const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');

// Kalkulator Elements
const hargaInput = document.getElementById('harga-input');
const dpInput = document.getElementById('dp-input');
const dpValSpan = document.getElementById('dp-val');
const tenorInput = document.getElementById('tenor-input');
const resDp = document.getElementById('res-dp');
const resPokok = document.getElementById('res-pokok');
const resCicilan = document.getElementById('res-cicilan');


// ==================== INTERAKSI UI ====================
// Toggle Mobile Menu
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Render Katalog Mobil (Mendukung Light & Dark Mode)
function renderCars(filter = 'all') {
    carGrid.innerHTML = '';
    const filtered = filter === 'all' ? carsData : carsData.filter(car => car.category === filter);
    
    filtered.forEach(car => {
        const card = document.createElement('div');
        card.className = "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden group flex flex-col justify-between hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors duration-300 shadow-sm";
        card.innerHTML = `
            <div>
                <div class="h-48 overflow-hidden bg-zinc-100 dark:bg-zinc-950">
                    <img src="${car.image}" alt="${car.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                </div>
                <div class="p-5">
                    <h3 class="font-bold text-lg text-zinc-900 dark:text-white mb-1">${car.name}</h3>
                    <p class="text-red-600 dark:text-red-500 font-semibold text-sm mb-4">${car.price}</p>
                </div>
            </div>
            <div class="p-5 pt-0 flex space-x-2">
                <button onclick="openModal(${car.id})" class="flex-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white text-sm font-medium py-2 rounded-lg transition">Detail</button>
                <button onclick="selectForCredit(${car.priceVal})" class="bg-red-600/10 dark:bg-red-600/20 hover:bg-red-600 text-red-600 dark:text-red-500 hover:text-white text-sm font-medium px-4 py-2 rounded-lg transition">Kredit</button>
            </div>
        `;
        carGrid.appendChild(card);
    });
}

// Render Dropdown Test Drive
function renderTestDriveOptions() {
    selectCarTarget.innerHTML = '';
    carsData.forEach(car => {
        const opt = document.createElement('option');
        opt.value = car.name;
        opt.textContent = car.name;
        selectCarTarget.appendChild(opt);
    });
}

// Filter Action (Mendukung Light & Dark Mode)
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => {
            b.classList.remove('bg-red-600', 'text-white');
            b.classList.add('bg-zinc-200', 'dark:bg-zinc-800', 'text-zinc-700', 'dark:text-zinc-300');
        });
        e.target.classList.remove('bg-zinc-200', 'dark:bg-zinc-800', 'text-zinc-700', 'dark:text-zinc-300');
        e.target.classList.add('bg-red-600', 'text-white');
        
        renderCars(e.target.dataset.filter);
    });
});

// Modal Detail Handler (Mendukung Light & Dark Mode)
window.openModal = function(id) {
    const car = carsData.find(c => c.id === id);
    if (!car) return;

    modalContent.innerHTML = `
        <h3 class="text-2xl font-bold text-zinc-900 dark:text-white mb-1">${car.name}</h3>
        <p class="text-red-600 dark:text-red-500 font-semibold mb-6">${car.price}</p>
        <div class="space-y-3 text-sm border-t border-zinc-200 dark:border-zinc-800 pt-4">
            <div class="flex justify-between"><span class="text-zinc-500 dark:text-zinc-400">Mesin:</span><span class="font-medium text-zinc-900 dark:text-white text-right">${car.specs.engine}</span></div>
            <div class="flex justify-between"><span class="text-zinc-500 dark:text-zinc-400">Tenaga Maksimal:</span><span class="font-medium text-zinc-900 dark:text-white text-right">${car.specs.power}</span></div>
            <div class="flex justify-between"><span class="text-zinc-500 dark:text-zinc-400">Transmisi:</span><span class="font-medium text-zinc-900 dark:text-white text-right">${car.specs.transmission}</span></div>
            <div class="flex justify-between"><span class="text-zinc-500 dark:text-zinc-400">Bahan Bakar:</span><span class="font-medium text-zinc-900 dark:text-white text-right">${car.specs.fuel}</span></div>
        </div>
        <button onclick="closeModal()" class="w-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-semibold py-2.5 rounded-lg transition mt-6">Tutup</button>
    `;
    modal.classList.remove('hidden');
}

function closeModal() {
    modal.classList.add('hidden');
}
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if(e.target === modal) closeModal(); });


// ==================== KALKULATOR KREDIT ====================
function formatIDR(num) {
    return 'Rp ' + num.toLocaleString('id-ID');
}

function hitungKredit() {
    const harga = parseFloat(hargaInput.value) || 0;
    const dpPersen = parseFloat(dpInput.value) || 20;
    const tenorTahun = parseInt(tenorInput.value) || 5;
    
    dpValSpan.textContent = dpPersen;
    
    const nominalDp = harga * (dpPersen / 100);
    const pokokHutang = harga - nominalDp;
    
    // Asumsi Bunga Flat 5% per tahun
    const totalBunga = pokokHutang * 0.05 * tenorTahun;
    const totalHutang = pokokHutang + totalBunga;
    const bulan = tenorTahun * 12;
    const cicilanPerBulan = totalHutang / bulan;
    
    resDp.textContent = formatIDR(Math.round(nominalDp));
    resPokok.textContent = formatIDR(Math.round(pokokHutang));
    resCicilan.textContent = formatIDR(Math.round(cicilanPerBulan));
}

window.selectForCredit = function(price) {
    hargaInput.value = price;
    hitungKredit();
    document.getElementById('kredit').scrollIntoView({ behavior: 'smooth' });
}

hargaInput.addEventListener('input', hitungKredit);
dpInput.addEventListener('input', hitungKredit);
tenorInput.addEventListener('change', hitungKredit);

// Form Test Drive Submit Handler
document.getElementById('testdrive-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Terima kasih! Permintaan Test Drive Anda berhasil dikirim. Tim kami akan segera menghubungi Anda.');
    e.target.reset();
});

// Inisialisasi Awal
renderCars();
renderTestDriveOptions();
hitungKredit();