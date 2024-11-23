
import { getConnecion } from "../database/connectionMongoDB";


const getLanguages = async () => {
    try{
        const database = await getConnecion(); // Asegúrate de usar await
        const languages = await database.collection("languages").find().toArray();

        console.log("lenguajes listed");
        console.table(languages);
    }catch (error) {
        console.error(error);
    }
};


getLanguages();
