let ejs = require("ejs")
const Commander = require('commander');
const program = new Commander.Command();
const fs = require('fs');
let path = require("path")
program.version('0.0.1');


program
    .option('-d, --debug', 'output extra debugging')
    .option('-s, --small', "xxx",(val)=>{
        return "hello"
    },'small pizza size')
    .option('-p, --pizza-type <type>', 'flavour of pizza')
    .option('-ad ,--add <filePath>',"添加v3基础页面","没有默认值")

program.parse(process.argv);

const options = program.opts();
if (options.debug) console.log(options);
if (options.add) addVue3Page(options.add)

// console.log(program.getOptionValue('add'));
// if (options.small) console.log('- small pizza size'+options.small);
// if (options.pizzaType) console.log(`- ${options.pizzaType}`);


function addVue3Page(filePath){

    if (path.extname(filePath) !== ".vue") {
        throw Error("必须是vue文件")
    }

    const templatePath = path.resolve(__dirname, "./v3.vue.ejs");
    let fileName = path.basename(filePath).split(".")[0].toLowerCase()
    ejs.renderFile(templatePath,{fileName},{},
        (err,result)=>{
            if(err){
                console.log(err);
                return
            }
            let targetPath = path.resolve(__dirname, filePath)
            if (!fs.existsSync(targetPath)) {
                mkdirSync(path.dirname(targetPath))
            }
            fs.promises.writeFile(targetPath, result).then(r => {
                console.log("成功",r);
            }).catch(err=>{
                console.log("失败",err);
            });

    })
    console.log(templatePath);

}

const writeFile = (path, content) => {
    if (fs.existsSync(path)) {
        console.log.error("the file already exists~")
        return;
    }
    return fs.promises.writeFile(path, content);
}

function mkdirSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true
    } else {
        // 不存在,判断父亲文件夹是否存在？
        if (mkdirSync(path.dirname(dirname))) {
            // 存在父亲文件，就直接新建该文件
            fs.mkdirSync(dirname)
            return true
        }
    }
}

/*


const addVue3TSComponent = async (name, dest) => {
    handleEjsToFile(name, dest, '../template/component3_ts.vue.ejs', `${name}.vue`);
}

ejs.renderFile("./vues",{fileName: ""},{},(err,str)=>{

})

function handleEjsToFile() {

}

*/
