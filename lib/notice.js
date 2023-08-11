// ██ notice.js ████████████████████████████████

// Create and append notice element above everything in the given container.
// Tapping/clicking anywhere dismiss the notice.
// Everything else under is blocked.
// customize style with alertStyle.css on root.

// Set target container div. Use body to block everything.
const container = document.querySelector("body");

function showNotice(noticeObject) {
  const title = noticeObject.title;
  const message = noticeObject.message;

  // Generate elements
  const noticeBg = document.createElement("div");
  const notice = document.createElement("div");
  noticeBg.classList.add("noticeBg", "noticeSpawn");
  notice.classList.add("notice");

  // Build Notice window template
  notice.innerHTML = `
        <img src='icons/help.svg' /> <br />
        <b>${title}</b> <br />
        \&nbsp;
        <br />
        ${message} <br />
        \&nbsp;
        <br />
        <span class='dismissNote'>Ketuk di mana saja untuk kembali.</span>
    `;

  // Append and mount to container
  noticeBg.appendChild(notice);
  container.appendChild(noticeBg);
  setTimeout(() => {
    noticeBg.classList.remove("noticeSpawn");
  }, 300);

  // Tap to dismiss
  noticeBg.addEventListener("click", function () {
    noticeBg.classList.add("noticeDespawn");
    setTimeout(() => {
      noticeBg.remove();
    }, 300);
  });
}

// Usage example
// showNotice({object});

const orangHilangHelp = {
  title: "Apa ini? Siapa mereka?",
  message: `
  ${getPermutations().toLocaleString()} jiwa terdaftar dalam bank data orang hilang ini.<br/>
  Mungkinkah mereka benar hilang? Atau mungkin mereka tidak pernah ada sama sekali?<br />
  \&nbsp;
  <br/>
  Setiap kamu membuka halaman ini, salah satu dari ${getPermutations().toLocaleString()} jiwa yang terdaftar akan muncul di hadapanmu.<br />
  Siapakah mereka? Mengapa mereka hilang? Ke mana mereka pergi? <br />
  \&nbsp;
  <br/>
  Lorem ipsum dolor sit amet. Di tengah-tengahnya pulau jawa.
  `
}