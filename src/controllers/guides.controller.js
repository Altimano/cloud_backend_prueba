const Guides = require('../database/models/guides');

//POST
const crearGuia = async(req, res) => {
    try {
		
		const { cost, guide_pdf, date_created, couriers } = req.body;
		
        const guide = await Guides.create({cost, guide_pdf, date_created, couriers});
	
		res.status(201).json(guide);
	} catch (error) {
        console.error("Error al crear guia: ", error);
        res.status(500).json({error: "Error al crear guia"});
	}
};

//GET
const getTodasGuias = async(req, res) => {
    try {
        const guides = await Guides.findAll();
        res.status(200).json(guides);
    } catch (error) {
        console.error("Error al obtener todas las guias");
        res.status(500).json({error: "Error al obtener todas las guias"})
    }
};

const getGuiaId = async(req, res) =>{
    try{
        const guide = await Guides.findByPk(req.params.id);
        res.status(200).json(guide)
    } catch (error) {
        console.error("Error al obtener guia")
        res.status(500).json({error: "Error al obtener todas las guias"})
    }
};

//UPDATE
const actualizarGuia = async(req,res) => {
    try {
        const {cost, guide_pdf, couriers} = req.body
        await Guides.update(
            {cost, guide_pdf, couriers },
            {
            where: {id: req.params.id}
            }
        );
        res.status(200).json()
    } catch (error) {
        console.error("Error al actualizar guia")
        res.status(500).json({error: "Error al actualizar guia"})
    }
};

//DELETE
const borrarGuia = async(req,res) => {

    try{
        await Guides.destroy({
        where: {id: req.params.id},
    }       
    )
    } catch (error) {
        console.error("Error al borrar guia")
        res.status(500).json({error: "Error al borrar guia"})
    }   
};

    //Exportamos 
module.exports = {
    crearGuia,
    getTodasGuias,
    getGuiaId,
    actualizarGuia,
    borrarGuia,
}