const puppeteer = require("puppeteer"); 
 
async function pbsKidsCharacters() { 
	try { 
		// Specify the URL of the dev.to tags web page 
		const URL = "https://pbskids.fandom.com/wiki/Category:Characters"; 
 
		// Launch the headless browser 
		const browser = await puppeteer.launch(); 
		const page = await browser.newPage(); 
		// Go to the webpage 
		await page.goto(URL); 
 
		// Perform a function within the given webpage context 
		const data = await page.evaluate(() => { 
			const results = []; 
 
			// Select all elements with crayons-tag class 
			const items = document.querySelectorAll(".category-page__member-link"); 
			items.forEach(item => { 
				// Get innerText of each element selected and add it to the array 
                if (!item.innerText.startsWith("Category:")) {
                    results.push(item.href); 
                }
			}); 
			return results; 
		}); 
 
        const randomItem = Math.floor(Math.random() * data.length);
		// Print the result and close the browser 
        const newUrl = data[randomItem];
        await page.goto(newUrl); 
        const newCall = await page.evaluate(() => {
            const newResults = [];
            const title = document.querySelector(".mw-page-title-main")
            const items = document.querySelectorAll("a[class*='image']")
            items.forEach(image => {
                const newImage = image.href
                if (newImage.includes("static.wikia")) {
                    newResults.push({
                        "title": title.innerText,
                        "image": image.href
                    })
                }
            })
            return newResults;
        });
        console.log(newCall)
		await browser.close(); 
	} catch (error) { 
		console.error(error); 
	} 
} 
 
pbsKidsCharacters();


// const randomItem = Math.floor(Math.random() * results.length);
