var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile')
var formidable = require('formidable')
var fs = require('fs')

var bdficheiros = __dirname + "/ficheiros.json"

/* GET home page. */
router.get('/', (req, res) => res.render('index'))

router.get('/carregar', (req,res)=> {
  jsonfile.readFile(bdficheiros, (err,fichs)=> {
    if(!err) res.render('lista',{lista: fichs})
    else res.render('error',{error:err})
  })
})
router.get('/apagar',(req,res)=>{
  var tmp=[]
      jsonfile.readFile(bdficheiros,(err,fich)=>{
        if(!err){
          console.dir(fich)
          jsonfile.writeFile(bdficheiros,tmp,err2=>{
            if(!err2) res.render('index.pug')
            else res.render('error',{error:err2})
          })
        }
        else{
          res.render('error',{error:err})
        }
      })

})

router.post('/processa',(req,res)=> {
  var form = new formidable.IncomingForm()
  var r = JSON.stringify('')
  form.parse(req,(err,fields,files)=> {
    var fenviado = files.ficheiro.path
    console.dir(fenviado)
    var fnovo = './public/images/'+files.ficheiro.name
    r = JSON.stringify(files.ficheiro.name)
    fs.rename(fenviado,fnovo,err1 => {
      if(!err) {
        res.json(r)
      }
      else {
        res.render('error',{error:err1})
      }
    }) 
  })
})

router.post('/atualizar', (req,res)=> {
  var f = req.body.ficheiro
  var d = req.body.desc
  jsonfile.readFile(bdficheiros, (err, fichs)=> {
    if(!err) {
      fichs.push({desc: d, ficheiro: f})
      console.dir(fichs)
      jsonfile.writeFile(bdficheiros,fichs,err2 => {
        if(!err2)
          console.log('Registo gravado com sucesso!')
        else
          res.render('error',{error:err2})
      })
    }
    else
      res.render('error',{error:err})
    })
    res.json(f)
  })




module.exports = router;
