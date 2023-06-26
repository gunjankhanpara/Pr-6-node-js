const crudtbl = require('../models/crudtbl');
const fs = require('fs');

const gunjan = async (req,res)=>{

    try{
        let user = await crudtbl.find({});
        if(user){
            return res.render('blog',{
                user,
                single : ""
            });
        }
        else
        {
            console.log("data not found");
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
   
}

const addrecord = async (req,res)=>{
    const {title,discpition} = req.body;
    try{
        let editId = req.body.editid;
        console.log(editId);
        if(editId){
            if(req.file){
                if(!title || !discpition){
                    console.log("enter the data");
                    return res.redirect('back');
                }
                let deletrecord = await crudtbl.findById(editId);
                if(deletrecord){
                    fs.unlinkSync(deletrecord.avtar)
                }
                else
                {
                    console.log("img not delete");
                }
                let img="";
                    if(req.file){
                        img = req.file.path
                    }
                    let updateRecord = await crudtbl.findByIdAndUpdate(editId,{
                       title : title,
                       discpition : discpition,
                       avtar : img
                    })
                    if(updateRecord){
                        console.log("Record successfully update");
                        return res.redirect('/');
                    }
                    else{
                        console.log("not update");
                        return res.redirect('/');
    
                    }
            }
            else{
                let img = "";
                let updata= await crudtbl.findById(editId);
                if(updata){
                    img = updata.avtar;
                    let updateRecord = await crudtbl.findByIdAndUpdate(editId,{
                        title : title,
                         discpition: discpition,
                         avtar : img 
                    })
                    if(updateRecord){
                        console.log("Record successfully update");
                        return res.redirect('/');
                    }
                    else{
                        console.log("Not Update");
                    }
                    
                }
                else
                {
                    console.log("record not fatch");
                    return res.redirect('/')  
                }
            }
        }   
        else
        {
            let img= "";
            if(req.file){
                img = req.file.path
            }
            if(!title || !discpition){
                console.log("enter the data");
                return res.redirect('/');
            }
            let data =  crudtbl.create({
                title : title,
                discpition : discpition,
                avtar : img
            })
            if(data){
                console.log("data add succesfully");
                return res.redirect('back');
            }
            else
            {
                console.log("not insert the data");
                return res.redirect('back');
            }
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('/');
    }
}

const deletdata =  async (req,res)=>{
    try{
      let id = req.query.id;
      let deletrecord = await crudtbl.findById(id);
      if(deletrecord){
        fs.unlinkSync(deletrecord.avtar)
      }
      else
      {
        console.log("img not delete");
      }
      let data = await crudtbl.findByIdAndDelete(id);
      if(data){
        console.log("data delete succefully");
        return res.redirect('back');
      }
      else
      {
        console.log("data not delete");
        return res.redirect('back')
      }
    }
    catch(err){
        console.log(err);
        return res.redirect('back')
    }
}

const edit = async (req,res)=>{
    try{
        let id = req.query.id;
        let alldata = await crudtbl.find({});
        let single = await crudtbl.findById(id);
        if(single){
            return res.render('blog',{
                  single,
                  user : alldata
            })
        }
        else{
            console.log("not fatch");
            return res.redirect('/')
        }
    }
    catch(err)
    {
        console.log(err);
        return res.redirect('/')
    }

}

module.exports = {gunjan,addrecord,deletdata,edit}