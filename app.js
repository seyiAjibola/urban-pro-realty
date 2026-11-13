const CONFIG = {
  whatsappNumber: "2347014702451",
  // Paste your Google Sheet "Publish to web -> CSV" URL below.
  // Leave empty ("") to automatically load the built-in demo listings.
  googleSheetCsvUrl: ""
};

const DEMO_PROPERTIES = [
  {
    title: "4-Bedroom Fully Detached Duplex + BQ",
    location: "Lekki Phase 1, Lagos",
    price: "₦280,000,000",
    price_numeric: 280000000,
    type: "For Sale",
    bedrooms: 4,
    specs: "4 Beds • 5 Baths • C of O",
    status: "Available",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Luxury 3-Bedroom Serviced Apartment",
    location: "Adeniran Ogunsanya, Surulere",
    price: "₦6,500,000 / yr",
    price_numeric: 6500000,
    type: "For Rent",
    bedrooms: 3,
    specs: "3 Beds • 24/7 Power • Security",
    status: "Available",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "500 SQM Dry Residential Land",
    location: "Sangotedo, Ajah, Lagos",
    price: "₦35,000,000",
    price_numeric: 35000000,
    type: "For Sale",
    bedrooms: 0,
    specs: "500 SQM • Governor's Consent",
    status: "Available",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Modern 2-Bedroom Luxury Shortlet",
    location: "Victoria Island, Lagos",
    price: "₦120,000 / night",
    price_numeric: 120000,
    type: "Shortlet",
    bedrooms: 2,
    specs: "2 Beds • Fast WiFi • Swimming Pool",
    status: "Available",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "5-Bedroom Semi-Detached Duplex",
    location: "GRA Ikeja, Lagos",
    price: "₦220,000,000",
    price_numeric: 220000000,
    type: "For Sale",
    bedrooms: 5,
    specs: "5 Beds • BQ • 24/7 Estate Security",
    status: "Available",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Executive 1-Bedroom Mini Flat",
    location: "Yaba, Lagos",
    price: "₦2,500,000 / yr",
    price_numeric: 2500000,
    type: "For Rent",
    bedrooms: 1,
    specs: "1 Bed • POP Ceiling • Gated Compound",
    status: "Sold",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"
  }
];

let allProperties = [];

function renderListings(list) {
  const grid = document.getElementById("listings-grid");
  const countEl = document.getElementById("results-count");
  grid.innerHTML = "";
  countEl.textContent = `Showing ${list.length} ${list.length === 1 ? "property" : "properties"}`;

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-12 bg-white rounded-2xl border border-slate-200">
        <p class="text-slate-600 font-semibold text-lg">No properties match your filters.</p>
        <p class="text-slate-400 text-sm mt-1">Try clearing your search or selecting a different budget range.</p>
        <button onclick="resetFilters()" class="mt-4 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition">
          Reset All Filters
        </button>
      </div>
    `;
    return;
  }

  list.forEach(prop => {
    const isSold = String(prop.status || "").trim().toLowerCase() === "sold";
    const msg = encodeURIComponent(`Hello Urban Pro Realty! I am interested in: ${prop.title} (${prop.location}) listed at ${prop.price}.`);
    const waLink = `https://wa.me/${CONFIG.whatsappNumber}?text=${msg}`;

    const card = document.createElement("div");
    card.className = "bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-lg transition";
    card.innerHTML = `
      <div>
        <div class="relative h-52 bg-slate-200">
          <img src="${prop.image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'}"
               alt="${prop.title}" class="w-full h-full object-cover" />
          <span class="absolute top-3 left-3 bg-neutral-900/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
            ${prop.type || "For Sale"}
          </span>
          ${isSold ? '<span class="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">SOLD</span>' : ""}
        </div>
        <div class="p-5">
          <p class="text-xs text-red-600 font-bold uppercase tracking-wide">${prop.location}</p>
          <h4 class="text-lg font-bold text-slate-900 mt-1">${prop.title}</h4>
          <p class="text-xl font-extrabold text-slate-900 mt-2">${prop.price}</p>
          <p class="text-xs text-slate-500 mt-2">${prop.specs}</p>
        </div>
      </div>
      <div class="px-5 pb-5">
        <a href="${waLink}" target="_blank"
           class="w-full block text-center ${isSold ? "bg-slate-200 pointer-events-none text-slate-500" : "bg-red-600 hover:bg-red-700 text-white"} font-semibold text-sm py-2.5 rounded-lg transition">
          ${isSold ? "Property Sold" : '<i class="fab fa-whatsapp mr-1"></i> Inquire on WhatsApp'}
        </a>
      </div>
    `;
    grid.appendChild(card);
  });
}

function applyFilters() {
  const keyword = document.getElementById("filter-search").value.trim().toLowerCase();
  const type = document.getElementById("filter-type").value;
  const beds = document.getElementById("filter-beds").value;
  const maxPrice = Number(document.getElementById("filter-budget").value);

  const filtered = allProperties.filter(prop => {
    const title = String(prop.title || "").toLowerCase();
    const location = String(prop.location || "").toLowerCase();
    const specs = String(prop.specs || "").toLowerCase();
    const propType = String(prop.type || "").trim();
    const propBeds = Number(prop.bedrooms || 0);
    const propPrice = Number(String(prop.price_numeric || prop.price || "0").replace(/[^0-9]/g, ""));

    const matchesKeyword = !keyword || title.includes(keyword) || location.includes(keyword) || specs.includes(keyword);
    const matchesType = type === "ALL" || propType.toLowerCase() === type.toLowerCase();
    const matchesBeds = beds === "ALL" || (beds === "4+" ? propBeds >= 4 : propBeds === Number(beds));
    const matchesBudget = !maxPrice || propPrice <= maxPrice;

    return matchesKeyword && matchesType && matchesBeds && matchesBudget;
  });

  renderListings(filtered);
}

function resetFilters() {
  document.getElementById("filter-search").value = "";
  document.getElementById("filter-type").value = "ALL";
  document.getElementById("filter-beds").value = "ALL";
  document.getElementById("filter-budget").value = "0";
  renderListings(allProperties);
}

function initSite() {
  if (CONFIG.googleSheetCsvUrl && typeof Papa !== "undefined") {
    Papa.parse(CONFIG.googleSheetCsvUrl, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: function(results) {
        allProperties = results.data && results.data.length > 0 ? results.data : DEMO_PROPERTIES;
        renderListings(allProperties);
      },
      error: function() {
        allProperties = DEMO_PROPERTIES;
        renderListings(allProperties);
      }
    });
  } else {
    allProperties = DEMO_PROPERTIES;
    renderListings(allProperties);
  }
}

document.addEventListener("DOMContentLoaded", initSite);
