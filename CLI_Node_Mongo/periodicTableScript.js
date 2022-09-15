const {MongoClient} = require('mongodb');


// sample connection string: "mongodb+srv://<username>:<password>@<your-cluster-url>/Periodic_Table?retryWrites=true&w=majority";
const uri = 'mongodb://localhost/myDatabase'


async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/drivers/node/ for more details
     */
        
       
    /**
     * The Mongo Client you will use to interact with your database
     * See https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html for more details
     * In case: '[MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated...'
     * pass option { useUnifiedTopology: true } to the MongoClient constructor.
     * const client =  new MongoClient(uri, {useUnifiedTopology: true})
     */
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls

        // ----------------- CREATE/INSERT CALLS
        await addElement(client,
            {
                name: "Hydrogen",
                period: 1,
                group: 1
            }
        );
  
        // Create 3 new elements
        await addMultipleElements(client, [
            {
                name: "Helium",
                period: 1,
                group: 18
            },
            {
                name: "Lithium",
                period: 2,
                group: 1
            },
            {
                name: "Beryllium",
                period: 2,
                group: 2
            },
            {
                name: "Boron",
                period: 2,
                group: 13
            },
            {
                name: "Carbon",
                period: 2,
                group: 14
            },{
                name: "Nitrogen",
                period: 2,
                group: 15
            },{
                name: "Oxygen",
                period: 2,
                group: 16
            },{
                name: "Fluorine",
                period: 2,
                group: 17
            },{
                name: "Neon",
                period: 2,
                group: 18
            },
        ]);



        //------------------ READ/SELECT CALLS 
        // Find the element named "Hydrogen" that we created 
        await findOneElementByName(client, "Hydrogen");

        // Find elements with the same period or group
        await findElementByPeriodOrGroup(client, {
            periodNumber: 1,
            // groupNumber: 1
        });




        // ------------------- UPDATE CALLS
        // Print the Infinite Views element
        // await findOneElementByName(client, "Hydrogen");
        // Update the Infinite Views element to have 6 bedrooms and 8 beds 
        await updateElementByName(client, "Hydrogen", { au: 1.008 });
        // Print the updated Infinite Views element
        await findOneElementByName(client, "Hydrogen");


        // // UPDATE MANY
        // // Update elements by group so they have a property type
        // await updateElementType(client, { 
        //     groupNumber: 18, 
        //     elementType: "Noble Gas" 
        // });



        // --------------------- DELETE/REMOVE CALLS
         // DELETE ONE
        // Check if a element named "Hydrogen" exists.

        await deleteElementByName(client, "Hydrogen");







    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);












// FUNCTION LIST HERE (FUTURE IMPORT?)

// ----------------------------------Insert elements (Create)
/**
 * Insert a New Element
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the Periodic_Table database
 * @param {Object} newElement The new Element to be added
 */
async function addElement(client, newElement){
    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertOne for the insertOne() docs
    const result = await client.db("Periodic_Table").collection("Elements").insertOne(newElement);
    console.log(`Element inserted in Periodic_Table with the following id: ${result.insertedId}`);
}

/**
 * Create multiple Elements
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the Periodic_Table database
 * @param {Object[]} newElements The new Elements to be added
 */
async function addMultipleElements(client, newElements){
    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertMany for the insertMany() docs
    const result = await client.db("Periodic_Table").collection("Elements").insertMany(newElements);
    console.log(`${result.insertedCount} new Element(s) added with the following id(s):`);
    console.log(result.insertedIds);
}








// ------------------------------------Find elements (Read)
/**
 * Print an element with the given name
 * Note: If more than one element has the same name, only the first element the database finds will be printed.
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the Periodic_Table database
 * @param {String} nameOfElement The name of the element you want to find
 */
 async function findOneElementByName(client, nameOfElement) {
    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#findOne for the findOne() docs
    const result = await client.db("Periodic_Table").collection("Elements").find({ name: nameOfElement });

    if (result) {
        console.log(`Found the following elements in the collection with the name '${nameOfElement}':`);
        // console.log(result.nameOfElement);
    } else {
        console.log(`No elements found with the name '${nameOfElement}'`);
    }
}

/**
 * Print elements according to period or group.
 * Results will be limited to the designated maximum number of results.
 * Results will be sorted by Name in descending order.
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the Periodic_Table database
 * @param {object} queryParams The query params object
 * @param {number} queryParams.periodNumber the period or 'row' 
 * @param {number} queryParams.groupNumber the group or 'column'
 * @param {number} queryParams.maximumNumberOfResults The maximum number of elements to be printed
 */
async function findElementByPeriodOrGroup(client, {
    periodNumber = 0,
    groupNumber = 0,
    maximumNumberOfResults = Number.MAX_SAFE_INTEGER
} = {}) {

    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find for the find() docs
    const cursor = client.db("Periodic_Table").collection("Elements")
        .find({ 
            $or: [
            { period: periodNumber },
            { group: groupNumber }
            ]
        }
        )
        .sort({ name: -1 })
        .limit(maximumNumberOfResults);

    // Store the results in an array
    const results = await cursor.toArray();

    // Print the results
    if (results.length > 0) {
        console.log(`Found ${results.length} element(s) with period ${periodNumber} and group ${groupNumber}`);
        results.forEach((result, i) => {

            console.log();
            console.log(`${i + 1}. name: ${result.name}`);
            console.log(`   _id: ${result._id}`);
            console.log(`   period: ${result.period}`);
            console.log(`   group: ${result.group}`);
        });
    } else {
        console.log(`No elements found with period: ${period_} or group ${group_}`);
    }
}









// -------------------------------------Update elements (Update)
/**
 * Update an element with the given name
 * Note: If more than one element has the same name, only the first element the database finds will be updated.
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the Periodic_Table database
 * @param {string} nameOfElement The name of the element you want to update
 * @param {object} updatedelement An object containing all of the properties to be updated for the given element
 */
 async function updateElementByName(client, nameOfElement, updatedElement) {
    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#updateOne for the updateOne() docs
    const result = await client.db("Periodic_Table").collection("Elements").updateOne({ name: nameOfElement }, { $set: updatedElement });

    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}


// /**
//  * Update elements according to period and group to indicate type.
//  * @param {MongoClient} client A MongoClient that is connected to a cluster with the Periodic_Table database
//  * @param {object} queryParams The query Pparams object
//  * @param {number} queryParams.groupNumber the group or 'column'
//  * @param {string} queryParams.elementType the type to designate for the group 
//  */
// async function updateElementType(client, {
//     groupNumber = 0,
//     elementType = ' '
// } = {}) {
//     // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#updateMany for the updateMany() docs
//     const cursor = client.db("Periodic_Table").collection("Elements")
//     .updateMany(
//         { group: groupNumber}, 
//         { property_type: { $exists: false } }, 
//         { $set: { property_type: elementType } });

//         const results = await cursor.toArray();

//     // Print the results
//     if (results.length > 0) {
//         console.log(`Updated element(s) with group ${groupNumber}`);
//         results.forEach((result, i) => {

//             console.log();
//             console.log(`${i + 1}. name: ${result.name}`);
//             console.log(`   _id: ${result._id}`);
//             console.log(`   period: ${result.period}`);
//             console.log(`   group: ${result.group}`);
//             console.log(`   group: ${result.property_type}`)
//         });
//     } else {
//         console.log(`No elements found with period: ${period_} or group ${group_}`);
//     }
//     }












// --------------------------Remove element (Delete)
/**
 * Delete an element with the given name.
 * Note: If more than one element has the same name, only the first element the database finds will be deleted.
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the Periodic_Table database
 * @param {string} nameOfElement The name of the element you want to delete
 */
 async function deleteElementByName(client, nameOfElement) {
    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#deleteOne for the deleteOne() docs
    const result = await client.db("Periodic_Table").collection("Elements").deleteOne({ name: nameOfElement });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}
