const form = document.getElementById("training-form");
const tableBody = document.querySelector("#records-table tbody");
const scriptURL = "https://script.google.com/a/macros/bankuiwphraoschool.ac.th/s/AKfycbwQkk9s4XF4Yy8hnpOxtVx8Co4BCJ67-JZaVikZn2TndwNgZbaifAPsLM3pE-yvcihFmw/exec"; // ← แก้ตรงนี้เป็น URL ของคุณ

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      body: formData
    });

    const result = await response.json();
    alert("ส่งข้อมูลสำเร็จ");
    form.reset();
    loadRecords(); // refresh
  } catch (error) {
    alert("เกิดข้อผิดพลาดในการส่งข้อมูล");
    console.error(error);
  }
});

async function loadRecords() {
  try {
    const response = await fetch(scriptURL + "?action=read");
    const data = await response.json();

    tableBody.innerHTML = "";
    data.forEach(row => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${row.title}</td>
        <td>${row.organization}</td>
        <td>${row.hours}</td>
        <td>${row.date}</td>
        <td><a href="${row.fileUrl}" target="_blank">เปิดไฟล์</a></td>
      `;
      tableBody.appendChild(tr);
    });
  } catch (error) {
    console.error("ไม่สามารถโหลดข้อมูลได้", error);
  }
}

window.onload = loadRecords;
