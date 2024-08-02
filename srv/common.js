const cds = require('@sap/cds');

function validateNull(value){
    
    if(value !== undefined && value !== null && value !== ''){
        return true;
    }else{
        return false;
    }
    
}

function validateField(value){
    
    if(value !== undefined && value !== null && value !== ''){
        return true;
    }else{
        return false;
    }
    
}

function setValue(value){
    if(validateField(value)){
        return value;
    }else{
        return null;
    }
}

function validateArray(value){
    
    if(value !== undefined && value !== null && value.length > 0){
        return true;
    }else{
        return false;
    }
    
}

function lPad(str,len) {
    return new Promise(async function(resolve, reject){
        try {
            var s = str.toString();
            while (s.length < len) {
                s = "0" + s;
            }
            resolve(s);
        }catch(error) {
            reject();
            throw error.toString();
        }
    })
}

async function generateIncidentNumber() {
    try {
        let incidentNumber = 0;
        const query = `SELECT INCNUMBER.NEXTVAL FROM DUMMY`;
        const rs = await cds.run(query);

        if (rs.length !== 0) {
            if (incidentNumber === 0) {
                incidentNumber = Object.values(rs[0])[0];
                return 'INC-' + new Date().getFullYear() + '-' + await lPad(incidentNumber, 5);
            } else {
                return 'INC-' + new Date().getFullYear() + '-' + await lPad('1', 5);
            }
        } 
    } catch (error) {
        console.error('Error retrieving incident number:', error);
        throw error;
    }
}

async function getSequenceNumber(tableName, columnName) {
    try {
        // Step 1: Find the sequence name
        const findSeqQuery = `
            SELECT COLUMN_ID
            FROM TABLE_COLUMNS
            WHERE TABLE_NAME = '${tableName}'
            AND COLUMN_NAME = '${columnName}';
        `;
        const findResult = await cds.run(findSeqQuery);
        if (findResult.length === 0) {
            throw new Error(`No sequence found for table: ${tableName} and column: ${columnName}`);
        }
        const outputSequence = Object.values(findResult[0])[0];
        console.log('Find Sequence Number', outputSequence);

        // Step 2: Construct the sequence name
        const sequence = `_SYS_SEQUENCE_${outputSequence}_#0_#`;
        console.log('Sequence', sequence);

        // Step 3: Retrieve the current value of the sequence
        const seqQuery = `SELECT "${sequence}".CURRVAL FROM DUMMY;`;
        const seqResult = await cds.run(seqQuery);
        if (seqResult.length === 0) {
            throw new Error(`No current value found for sequence: ${sequence}`);
        }
        const outvar = Object.values(seqResult[0])[0];
        console.log('Seq Generated', outvar);

        return outvar;
    } catch (error) {
        console.error('Error retrieving sequence number:', error);
        throw new Error(`Error retrieving sequence number: ${error.message}`);
    }
}

async function createAuditLog(INCID, REFID, RTYPE, SRVNM, PLOAD, VIENM) {
    try {
        const auditQuery = `CALL "prCreateAuditLog"(?,?,?,?,?,?)`;
        const params = [INCID, REFID, RTYPE, SRVNM, PLOAD, VIENM];
        const result = await cds.run(auditQuery, params);
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error(error.toString());
    }
}

function createSummary(INCID, PRFLW, ISRED, SECTN, DETLS, EVDES){
    return new Promise(async function(resolve, reject){
        try {
            const summaryQuery = `CALL "prCreateEventSummary"(?,?,?,?,?,?), [${INCID}, ${PRFLW}, ${ISRED}, ${SECTN}, ${DETLS}, ${EVDES}]`;
            const result = await cds.run(summaryQuery);
            outvar = result;
            resolve(outvar);

        } catch (error) {
            console.error('Error:', error);
            reject();
            throw error.toString();

        }
    })  
}
async function createErrorLog(APPNM, SRVNM, PLOAD, ERTXT, MDLNM, USRID) {
    try {
        const errorQuery = `CALL "prCreateErrorLog"(?,?,?,?,?,?)`;
        const params = [APPNM, SRVNM, PLOAD, ERTXT, MDLNM, USRID];
        const result = await cds.run(errorQuery, params);
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error(error.toString());
    }
}

module.exports = {
    validateField,
    getSequenceNumber,
    generateIncidentNumber,
    createAuditLog,
    createSummary,
    createErrorLog,
    lPad,
    setValue
  };
