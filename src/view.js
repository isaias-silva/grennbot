const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const view= async function (link) {
    const url = link
  
    
    let views = 0;
    async function acess() {
        //browser
        const browser = await puppeteer.launch({});
        //pagina
        const page = await browser.newPage();
        //pagina vai para url
        await page.goto(url);

        await page.waitForTimeout(4000)
        await page.click('.ytp-play-button.ytp-button')
        await page.waitForTimeout(10000)
    
        //fechar
        await browser.close()

    }

  const interv= setInterval(() => {
     
        if(views>50){
            clearInterval(interv)
            return 'ok'
        }else{
            views++
            console.log(`${views} views`)
            acess()
        }
    }, 20000);
}

module.exports=view;