const fs = require("fs").promises;
const jediFile = "jedi_list.json";

async function replaceJedi(jediId, jedi) {
   //TODO write logic replacing jedi by it's id with newly passed jedi
   let data = await readJediFile();
   const jediIndex = data.findIndex((elem) => jediId === elem.id);

   const jediToReplace = data[jediIndex];
   Object.assign(jediToReplace, jedi);

   await writeJediFile(data);
   return jediToReplace;
}

async function deleteJedi(id) {
   //TODO Delete jedi by given id in our file
   const data = await getAll();
   const index = data.findIndex((value) => value.id === id);
   const deletedJedi = data[index];
   data.splice(index, 1);
   await writeJediFile(data);
   return deletedJedi;
}

async function getAll() {
   //TODO obtain all saved jedis and return it to callee
   const data = await readJediFile();
   return data;
}

async function addJedi(jedi) {
   let data = await readJediFile();
   if (!data) {
      data = [];
   }
   data.push(jedi);
   await writeJediFile(data);
}

async function getJedi(id) {
   const data = await readJediFile();
   return data.find((value) => value.id === id);
}

async function readJediFile() {
   try {
      const data = await fs.readFile(jediFile);
      console.log(data.toString());
      return JSON.parse(data.toString());
   } catch (error) {
      console.error(`Got an error trying to read the file: ${error.message}`);
   }
}

async function writeJediFile(content) {
   try {
      await fs.writeFile(jediFile, JSON.stringify(content));
   } catch (error) {
      console.error(`Failed to write to file ${error.message}`);
   }
}

module.exports = {
   addJedi,
   getJedi,
   getAll,
   replaceJedi,
   deleteJedi,
};
