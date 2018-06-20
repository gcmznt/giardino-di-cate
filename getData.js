const fs = require("fs");
const puppeteer = require("puppeteer");

const url = "http://www.ilgiardinodeibimbi.it/index.asp";

const getData = async () => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();
  await page.goto(url);
  await page.focus('[name="userName"]');
  await page.keyboard.type(process.env.USERNAME);
  await page.focus('[name="userPwd"]');
  await page.keyboard.type(process.env.PASSWORD);
  await page.keyboard.press("Enter");

  await page.waitForNavigation({ waitUntil: "load" });

  const act = (await page.evaluate(() =>
    Array.from(document.querySelectorAll('[id*="AttivitaBimbo"]')).map(d => ({
      key: d.id,
      date: d.parentElement.parentElement.previousElementSibling.querySelector(
        "[align=left]"
      ).innerText,
      title: Array.from(d.querySelectorAll(".title")).map(e => e.innerText),
      text: Array.from(d.querySelectorAll(".text")).map(e => e.innerText)
    }))
  )).map(a => ({
    key: a.key,
    date: a.date,
    entries: a.title
      .map((e, i) => ({
        title: e
          .replace("Ha Scaricato?", "💩")
          .replace("Ha Dormito?", "😴")
          .replace("Ha Fatto Merenda?", "🍦")
          .replace("Annotazioni Varie:", "📝")
          .replace("Attività Svolte?", "🤾‍")
          .replace("Menu del Giorno:", "🍲"),
        text: a.text[i]
          .toLowerCase()
          .replace(/\s*\n\s*/g, "\n")
          .replace(/\s{2,}/g, " ")
          .replace(/^si/g, "")
          .replace(/^no/g, "❌")
          // .replace(/\s+/g, " ")
          .trim()
          .split("\n")
          .map(e =>
            e
              .replace(/ no$/g, " ❌")
              .replace(/ quasi tutto$/g, " 👍")
              .replace(/ tutto$/g, " 🤤")
              .replace(/ si$/g, " ✅")
          )
          .filter(val => val)
      }))
      .filter(e => e.text.length)
      .filter(e => e.title !== "Ha Mangiato?")
  }));
  await browser.close();
  return act;
};

getData()
  .then(data => {
    fs.writeFile("./static/data.json", JSON.stringify(data), function(err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
  })
  .catch();
