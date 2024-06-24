const server_base_url = 'https://leetcode-music-player-1.onrender.com';
// const server_base_url = 'http://localhost:8080';



// Rating Graph ---------------------------------------
const ratingGraph = (arr) => {
    const line_con = document.querySelector("g.highcharts-series.highcharts-series-0.highcharts-line-series > path.highcharts-graph");
    const lines = document.querySelectorAll("g.highcharts-series.highcharts-series-0.highcharts-line-series > path.highcharts-graph .highcharts-point");
    let x_min = 3.578431372549;
    let x_max = 361.42156862745;
    let n = 200;

    function makeD() {
        let d = '';
        let x_range = x_max - x_min;
        let bias = x_range / 2;
        // let max_h = 50;
        let idx = 0;
        const emp_factor = 4; // used to nudge y a little (relative to its neighbour)
        let prev_y = -100;
        for (let x = x_min; x <= (x_max + bias); x += x_range / n) {
            // let y = Math.floor(Math.random() * max_h); // tweak this according to music
            let y = (arr[idx * 3] / 255) * 50; // tweak this according to music
            let y_emp = y;
            if(prev_y < 0) {
                prev_y = y;
            } else {
                let dy = y - prev_y;
                prev_y = y;
                y_emp += dy * emp_factor;
            }
            y = y_emp;
            y = 50 - y; // invert y
            idx++;
            if (x == x_min) {
                d += `M ${x} ${y}`;
            } else {
                d += `L ${x} ${y}`;
            }
            const color = `rgb(255, 161, 22, ${Math.max(0, y / 50 - 0.5)})`;
            // if(idx in lines) {
            //     // lines[idx].setAttribute('fill', color);
            // }
        }

        return d;
    }
    line_con.setAttribute('d', makeD())
};
// -----------------------------------------------------


// Heatmap --------------------------------------------
const heatmap = () => {
    // const fill_colors = ['var(--green-10)','var(--green-20)','var(--green-40)','var(--green-60)','var(--green-80)','var(--green-100)','var(--fill-tertiary)'];
    const fill_colors = ['var(--green-10)', 'var(--green-20)', 'var(--green-40)', 'var(--green-60)', 'var(--green-80)'];
    const sel = document.querySelectorAll('g.week > rect');
    // console.log(sel);
    sel.forEach(el => el.setAttribute('fill', fill_colors[Math.floor(Math.random() * fill_colors.length)]))
};
//-----------------------------------------------------



// Height charts --------------------------------------
const heightCharts = (arr) => {
    const bars = document.querySelectorAll(".highcharts-series-0 > .highcharts-point");
    // let start_x = -16.5 * 2;
    let start_x = -18;
    let incs = [17, 16];
    let bottom = 115.5;
    let min_h = 10;
    let max_h = 100;
    // 1    2               3 
    // 17   1*17 + 1*16    2*17 + 1 * 16
    const makeD = (n, h) => {
        let a = Math.ceil(n / 2);
        let b = n - a;
        let base_x = start_x + a * incs[0] + b * incs[1];
        let base_y = bottom - h;
        return `M ${5.5 + base_x} ${base_y} 
L ${16.5 + base_x} ${base_y} 
A 2 2 0 0 1 ${18.5 + base_x} ${base_y + 2} 
L ${18.5 + base_x} 115.5 
A 0 0 0 0 1 ${18.5 + base_x} 115.5 
L ${3.5 + base_x} 115.5 
A 0 0 0 0 1 ${3.5 + base_x} 115.5 
L ${3.5 + base_x} ${base_y + 2} 
A 2 2 0 0 1 ${5.5 + base_x} ${base_y}             
Z`
            .split('\n')
            .join(' ');
    }

    bars.forEach((bar, idx) => {
        if (idx == 0) bar.setAttribute('fill', 'transparent');
        if (idx == 0) bar.setAttribute('stroke', 'transparent');
        bar.setAttribute('d', makeD(idx, min_h + (arr[idx * 5] / 255) * (max_h - min_h)));
    })
};
// -----------------------------------------------------



const setupMeter = () => {
    const el = `
<g class="origin-center translate-x-0" style="rotate:90deg">
    <circle cx="50" cy="50" r="42" class="fill-transparent qa_6R stroke-[#F0F0F0] dark:stroke-[#434343]" style="stroke-width: 3; stroke-linecap: round;">
    </circle>
    <circle cx="50" cy="50" r="42" class="fill-transparent qa_6R stroke-sd-easy" style="stroke-width: 3; stroke-linecap: round; stroke-dasharray: 315; stroke-dashoffset: ${315};" id="IM_METER_BUDDY">
    </circle>
</g>
`;
    const meter_container = document.querySelector('g[clip-path="url(#bar-mask)"]');
    meter_container.innerHTML = el;

}

const meter = (arr) => {
    const meter_el = document.getElementById('IM_METER_BUDDY');
    // meter_el.style.strokeDashoffset = (315 - (arr[0] / 255) * 260);
    // meter_el.style.strokeDasharray = (315 - (arr[0] / 255) * 260);
    meter_el.setAttribute('class', `fill-transparent qa_6R stroke-sd-${arr[0] < 100 ? 'easy' : (arr[0] < 200 ? 'medium' : 'hard')}`);
    meter_el.setAttribute('style', `stroke-width: 3; stroke-linecap: round; stroke-dasharray: 315; stroke-dashoffset: ${315 - (arr[0] / 255) * 260};`);
};





const meter2 = (arr) => {

    const el = `
<g class="origin-center translate-x-0" style="rotate:90deg">
    <circle cx="50" cy="50" r="42" class="fill-transparent qa_6R stroke-[#F0F0F0] dark:stroke-[#434343]" style="stroke-width: 3; stroke-linecap: round;">
    </circle>
    <circle cx="50" cy="50" r="42" class="fill-transparent qa_6R stroke-sd-${arr[0] < 100 ? 'easy' : (arr[0] < 200 ? 'medium' : 'hard')}" style="stroke-width: 3; stroke-linecap: round; stroke-dasharray: 315; stroke-dashoffset: ${315 - (arr[0] / 255) * 260};">
    </circle>
</g>
`;
    const meter_container = document.querySelector('g[clip-path="url(#bar-mask)"]');
    meter_container.innerHTML = el;
};




// -----------------------------------------------------

const getGifBadgeUrl = ( month, year) =>{
    month = +month;
    year = +year;
    return `https://assets.leetcode.com/static_assets/public/images/badges/${year}/gif/${year}-${month < 10 ? '0' : ''}${month}.gif`;
}

const getYearMonthFromBadgeUrl=(url) => {
    // url is something like /static/images/badges/dcc-2024-5.png
    if(url){
        const img_name = url.split('/').pop(); // dcc-2024-5.png
        if(img_name){
            const img_name_tok = img_name.split('-');
            if(img_name_tok.length == 3){
                const year = img_name_tok[1];
                const month = img_name_tok[2].split('.')[0];
                if(year && month){
                    return {year, month};
                }
            }
        }
    }

    return null;
}

const animateBadges = () => {
    const heatmap_badges = document.querySelectorAll('image');
    heatmap_badges.forEach((badge, idx)=>{
        const attrib = badge.getAttribute('xlink:href');
        const yearMonth = getYearMonthFromBadgeUrl(attrib);
        if(yearMonth){
            const {year, month} = yearMonth;
            const gif_url = getGifBadgeUrl(month, year);
            setTimeout(()=>{
                badge.setAttribute('xlink:href', gif_url);
            }, idx * 500); // add .5 seconds delay between each gif
        }
    });    



    const profile_badge =  document.querySelector("div[class='ml-1'] img[class='h-\[12px\]']");
    const attrib = profile_badge?.getAttribute('src');
    if(attrib){
        const yearMonth = getYearMonthFromBadgeUrl(attrib);
        if(yearMonth){
            const {year, month} = yearMonth;
            const gif_url = getGifBadgeUrl(month, year);
            profile_badge.setAttribute('src', gif_url);
        }
    }
}




const animateOthers = () => {
    const streak_days = document.querySelector("#headlessui-popover-button-\\:r2\\:")
    const profile_img_top = document.querySelector('#navbar_user_avatar img');
    const profile_img_left = document.querySelector('img[alt="Avatar"]');
    streak_days?.classList.add('animate-pulse');
    profile_img_top?.classList.add('animate-spin');
    profile_img_left?.setAttribute('src', `${server_base_url}/alan-walker-glitch.gif`);
}




const audio_container = document.querySelector("#__next > div.flex.min-h-screen.min-w-\\[360px\\].flex-col.text-label-1.dark\\:text-dark-label-1.bg-layer-bg.dark\\:bg-dark-layer-bg > div.mx-auto.w-full.grow.p-4.md\\:max-w-\\[888px\\].md\\:p-6.lg\\:max-w-screen-xl > div > div.lc-lg\\:max-w-\\[calc\\(100\\%_-_316px\\)\\].w-full > div.lc-xl\\:flex-row.lc-xl\\:space-y-0.flex.w-full.flex-col.space-x-0.space-y-4.lc-xl\\:space-x-4 > div.bg-layer-1.dark\\:bg-dark-layer-1.shadow-down-01.dark\\:shadow-dark-down-01.rounded-lg.h-\\[180px\\].w-full.flex-1 > div > div");

// const audio_url = 'https://github.com/PrashanthKumar0/Fire-Audio-Visualizer/raw/master/music.mp3';
// const audio_url = 'http://localhost:8080/music.mp3';
const audio_url = `${server_base_url}/music.m4a`;
const audio = new Audio(audio_url);
audio.crossOrigin = "anonymous";
audio.controls = true;
audio_container.innerHTML = "";
audio_container.prepend(audio);

let audCtx = new AudioContext();
let analyser = audCtx.createAnalyser();
let audSrc = audCtx.createMediaElementSource(audio);
audSrc.connect(analyser);
analyser.connect(audCtx.destination);
let arr = new Uint8Array(analyser.frequencyBinCount);




setupMeter();
animateOthers();
animateBadges();
loop();
// setInterval(loop, 500)

var g_time = performance.now();
var g_heatmap_step_size = 300;

function loop() {
    let time = performance.now();
    let dt = time - g_time;
    if(dt > g_heatmap_step_size) {
        g_time = time;
    }

    analyser.getByteFrequencyData(arr);
    meter(arr);
    // meter2(arr);
    ratingGraph(arr);
    heightCharts(arr);

    if(dt > g_heatmap_step_size){
        heatmap();
    }
    requestAnimationFrame(loop);
}






