const { validateField ,getSequenceNumber, setValue } = require('./common');
const cds = require('@sap/cds');
let oInput,tx;




module.exports = cds.service.impl(function (){
    this.on("i1YrIhR4FiW0Wkg2", async (req) => {
        try {
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.XkXwXp4nCf5azs0U);
            const oReportIncident = oInput.ReportIncident;
            const oNearMiss = oInput.NearMiss;
            const oEnvironmental = oInput.Environmental;
            const oFire = oInput.Fire;
            const oTranspotation = oInput.Transpotation;
            const oOfficialTravel = oInput.OfficialTravel;
            const aAttachments = oInput.Attachments;

            tx = cds.transaction(req);


            //main post call incident details
            if(validateField(oReportIncident.INCID)){
 
            result = await tx.run(`CALL "prCreateUpdateIncidentDetails"(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [
                setValue(oReportIncident.INCID),setValue(oReportIncident.CLASS) ,setValue(oReportIncident.OTRMN) ,setValue(oReportIncident.REPOB) ,setValue(oReportIncident.ORGZN) ,
                setValue(oReportIncident.REPPR) ,setValue(oReportIncident.INUPI) ,setValue(oReportIncident.INCVP),setValue(oReportIncident.IUNIT) ,setValue(oReportIncident.INCDT) ,
                setValue(oReportIncident.INCTM) ,setValue(oReportIncident.INCLC) ,setValue(oReportIncident.CNTIR) ,setValue(oReportIncident.INRDT),setValue(oReportIncident.INRTM) ,
                setValue(oReportIncident.LODES) ,setValue(oReportIncident.INDES) ,setValue(oReportIncident.REGNO) ,setValue(oReportIncident.WORKC) ,setValue(oReportIncident.WITBY),
                setValue(oReportIncident.ISAVE) ,setValue(oReportIncident.ATTFL)]);
            console.log(result);
            
            const oINCID = oReportIncident.INCID == 0 ? await getSequenceNumber("INC_T_INCDT","INCID") : oReportIncident.INCID;

            //incident type
            for(let i=0;i<oReportIncident.INCType.length;i++){
                result = await tx.run(`CALL "prCreateUpdateIncidentType"(?,?,?,?)`, [setValue(oReportIncident.INCType[i].ITPID), oINCID, setValue(oReportIncident.INCType[i].INCTP),
                setValue(oReportIncident.INCType[i].ISDEL)]);
                console.log(result);
            }
 
            //injured people details    
            for(let i=0;i<oReportIncident.DetailsofInjured.length;i++){
                result = await tx.run(`CALL "prCreateUpdateInjuredDetails"(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [setValue(oReportIncident.DetailsofInjured[i].INJID), oINCID, 
                setValue(oReportIncident.DetailsofInjured[i].EMPTP), setValue(oReportIncident.DetailsofInjured[i].NAOIN), 
                setValue(oReportIncident.DetailsofInjured[i].INUPI), setValue(oReportIncident.DetailsofInjured[i].INCVP), setValue(oReportIncident.DetailsofInjured[i].EUNIT), 
                setValue(oReportIncident.DetailsofInjured[i].REGON), setValue(oReportIncident.DetailsofInjured[i].ECITY), setValue(oReportIncident.DetailsofInjured[i].NSOTL), 
                setValue(oReportIncident.DetailsofInjured[i].ESOTL), setValue(oReportIncident.DetailsofInjured[i].CNTRY), setValue(oReportIncident.DetailsofInjured[i].ORGAN), 
                setValue(oReportIncident.DetailsofInjured[i].EASNS), setValue(oReportIncident.DetailsofInjured[i].PPNON)]);
                console.log(result);

                const oINJID = oReportIncident.DetailsofInjured[i].INJID == 0 ? await getSequenceNumber("INC_T_INJDT","INJID"):oReportIncident.DetailsofInjured[i].INJID;

                // personal injury
                for(let j=0;j<oReportIncident.DetailsofInjured[i].personalinjury.length;j++){
                    result = await tx.run(`CALL "prCreateUpdatePersonalInjury"(?,?,?,?,?,?,?,?,?,?)`, [setValue(oReportIncident.DetailsofInjured[i].personalinjury[j].PRIID), oINCID, 
                     oINJID, setValue(oReportIncident.DetailsofInjured[i].personalinjury[j].LTRTQ), setValue(oReportIncident.DetailsofInjured[i].personalinjury[j].WTIMF), 
                    setValue(oReportIncident.DetailsofInjured[i].personalinjury[j].WBBFE), setValue(oReportIncident.DetailsofInjured[i].personalinjury[j].WBSPT), 
                    setValue(oReportIncident.DetailsofInjured[i].personalinjury[j].WHDTE), setValue(oReportIncident.DetailsofInjured[i].personalinjury[j].TOBBF), 
                    setValue(oReportIncident.DetailsofInjured[i].personalinjury[j].OTHER)]);
                    console.log(result);

                    const oPINID = oReportIncident.DetailsofInjured[i].personalinjury[j].PRIID == 0 ? await getSequenceNumber("INC_T_PIJIL","PRIID") : oReportIncident.DetailsofInjured[i].personalinjury[j].PRIID;

                    //body parts
                    for(let k=0;k<oReportIncident.DetailsofInjured[i].personalinjury[j].injuredbodypart.length;k++){
                        result = await tx.run(`CALL "prCreateUpdateInjuredBodyPart"(?,?,?,?,?,?)`, [setValue(oReportIncident.DetailsofInjured[i].personalinjury[j].injuredbodypart[k].IBDID), oINCID, oPINID, 
                        setValue(oReportIncident.DetailsofInjured[i].personalinjury[j].injuredbodypart[k].BODPT),setValue(oReportIncident.DetailsofInjured[i].personalinjury[j].injuredbodypart[k].NOIIL), 
                        setValue(oReportIncident.DetailsofInjured[i].personalinjury[j].injuredbodypart[k].SIDEY)]);
                        console.log(result);
                    }
                }
            }

            //witness details
            for(let i=0;i<oReportIncident.witnessdetails.length;i++){
                result = await tx.run(`CALL "prCreateUpdateWitnessDetails"(?,?,?,?,?,?,?)`, [setValue(oReportIncident.witnessdetails[i].WITID),oINCID,null, 
                setValue(oReportIncident.witnessdetails[i].WITTP), setValue(oReportIncident.witnessdetails[i].WITNM), setValue(oReportIncident.witnessdetails[i].WITPN), 
                setValue(oReportIncident.witnessdetails[i].WITEM)]);
                console.log('hahahahahah');
                console.log(result);
            }


            // Environmental
            if(validateField(oEnvironmental.ENVID)){
                result = await tx.run(`CALL "prCreateUpdateEnvironmental"(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [setValue(oEnvironmental.ENVID),oINCID, setValue(oEnvironmental.WESCD), 
                    setValue(oEnvironmental.PRLOC), setValue(oEnvironmental.DESLO), setValue(oEnvironmental.PRSDC), null,null, 
                    setValue(oEnvironmental.WCTTR), setValue(oEnvironmental.TSROS), setValue(oEnvironmental.EQSRD), 
                    setValue(oEnvironmental.UNMNT), setValue(oEnvironmental.ISCON), setValue(oEnvironmental.WCRLS), 
                    setValue(oEnvironmental.WRSCN), setValue(oEnvironmental.WIMRT), setValue(oEnvironmental.CNMSS), setValue(oEnvironmental.ADCOM)]);
                console.log(result);

                const oENVID = oEnvironmental.ENVID == 0 ? await getSequenceNumber("INC_T_ENVIT","ENVID") : oEnvironmental.ENVID;

                // released to
                for(let i=0;i<oEnvironmental.releasedto.length;i++){
                    result = await tx.run(`CALL "prCreateUpdateReleasedTo"(?,?,?,?,?)`, [setValue(oEnvironmental.releasedto[i].RSLID),oENVID,oINCID,setValue(oEnvironmental.releasedto[i].RLTOI),
                    setValue(oEnvironmental.releasedto[i].ISDEL)]);
                    console.log(result);
                }
            }

            //fire explosion
            if(validateField(oFire.FREID)){
            result = await tx.run(`CALL "prCreateUpdateFireExplosion"(?,?,?,?,?,?,?,?)`, [setValue(oFire.FREID), oINCID, setValue(oFire.EQPUD), setValue(oFire.IRTES), 
                setValue(oFire.WAEVD), setValue(oFire.DWASD), 
                setValue(oFire.COINC), setValue(oFire.WIRMT)]);
            console.log(result);
            }
            // transportation
            if(validateField(oTranspotation.TRSID)){ 
            result = await tx.run(`CALL "prCreateUpdateTransportation"(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [setValue(oTranspotation.TRSID),oINCID, setValue(oTranspotation.TYPTR), setValue(oTranspotation.LOCXX), 
                setValue(oTranspotation.SPEXX), setValue(oTranspotation.POLIV), setValue(oTranspotation.ACTTI), setValue(oTranspotation.OPASS), setValue(oTranspotation.INJUR), setValue(oTranspotation.OVCXX), setValue(oTranspotation.VEIID), 
                setValue(oTranspotation.MDLYR), setValue(oTranspotation.VECDS), setValue(oTranspotation.PCVXX)]);
            console.log(result);
            }
            //attachments
            for(let i=0;i<aAttachments.length;i++){
                result = await tx.run(`CALL "prCreateUpdateAttachment"(?,?,?,?,?,?,?)`, [setValue(aAttachments[i].ATTID),oINCID, setValue(aAttachments[i].FLTTL), setValue(aAttachments[i].FILTP), 
                setValue(aAttachments[i].FLDES), setValue(aAttachments[i].ISCON), setValue(aAttachments[i].OBJCT)]);
                console.log(result);
            }

            //near miss
            if(validateField(oNearMiss.NRMID)){
            result = await tx.run(`CALL "prCreateUpdateNearMiss"(?,?,?,?,?,?,?,?,?,?,?,?)`, [setValue(oNearMiss.NRMID),oINCID, setValue(oNearMiss.NRMDT), setValue(oNearMiss.NMRDT), setValue(oNearMiss.NRMTM), 
            setValue(oNearMiss.NMRTM), setValue(oNearMiss.WEACN), setValue(oNearMiss.INCCN), setValue(oNearMiss.LOCTN), setValue(oNearMiss.OFFTR), setValue(oNearMiss.NMDES), setValue(oNearMiss.WITBY)]);
            console.log(result);

            const oNRMID = oNearMiss.NRMID == 0 ? await getSequenceNumber("INC_T_NRMIS","NRMID") : oNearMiss.NRMID;


            //near miss type
            for(let i=0;i<oNearMiss.nearmisstype.length;i++){
                result = await tx.run(`CALL "prCreateUpdateNearMissType"(?,?,?,?,?)`, [setValue(oNearMiss.nearmisstype[i].NMTID),oINCID, oNRMID, setValue(oNearMiss.nearmisstype[i].NRMTP), 
                setValue(oNearMiss.nearmisstype[i].ISDEL)]);
                console.log(result);
            }

            //near miss potential
            for(let i=0;i<oNearMiss.potentialnearmiss.length;i++){
                result = await tx.run(`CALL "prCreateUpdatePotentialNearMiss"(?,?,?,?,?)`, [setValue(oNearMiss.potentialnearmiss[i].NMPID),oINCID,oNRMID, 
                setValue(oNearMiss.potentialnearmiss[i].NRMPT), setValue(oNearMiss.potentialnearmiss[i].ISDEL)]);
                console.log(result);
            }

            //witness details for near miss
            for(let i=0;i<oNearMiss.witnessdetails.length;i++){
                result = await tx.run(`CALL "prCreateUpdateWitnessDetails"(?,?,?,?,?,?,?)`, [setValue(oNearMiss.witnessdetails[i].WITID),oINCID,oNRMID, 
                    setValue(oNearMiss.witnessdetails[i].WITTP), setValue(oNearMiss.witnessdetails[i].WITNM), 
                    setValue(oNearMiss.witnessdetails[i].WITPN), setValue(oNearMiss.witnessdetails[i].WITEM)]);
                console.log(result);
            }
            }
            //official travel
            result = await tx.run(`CALL "prCreateUpdateOfficialTravel"(?,?,?,?,?,?,?,?)`, [setValue(oOfficialTravel.OFTID), oINCID, setValue(oOfficialTravel.RFTVL), setValue(oOfficialTravel.INCLC), 
            setValue(oOfficialTravel.LCDES),setValue(oOfficialTravel.LOCIN), setValue(oOfficialTravel.ACTTI), setValue(oOfficialTravel.WIRMT)]);
            console.log(result);
            
            
            //Audit log
            result = await tx.run(`CALL "prCreateAuditLog"(?,?,?,?,?,?)`, [oINCID,oINCID,'UpdateIncidnt','UpdateIncidnt',JSON.stringify(req.data.XkXwXp4nCf5azs0U),'ViewName']);
            console.log(result);
            // await createAuditLog(oINCID,oINCID,'CreateIncidnt','CreateIncident',JSON.stringify(req.data.XkXwXp4nCf5azs0U),'ViewName');

            //Summary
            result = await tx.run(`CALL "prCreateEventSummary"(?,?,?,?,?,?)`, [oINCID, 0, 0, 'Report Incident', 'Incident Updated', 'Updated']);
            console.log(result);                                               //INCID, PRFLW, ISRED, SECTN, DETLS, EVDES
            //createSummary(oINCID, 0, 0, 'Report Incident', 'Incident Created', 'Created');
            returnObj={};
            
            returnObj = {
                "Success":"Incident Updated",
                "Incident Number": IncidentName,
                "Incident Id" : oINCID
            }
            
            // await tx.commit();
            return JSON.stringify(returnObj);
        }
        }catch (error) {
            //Error log
            tx1 = cds.transaction(req);
            result = await tx1.run(`CALL "prCreateErrorLog"(?,?,?,?,?,?)`, ['Report Incident', 'UpadteIncident', req.data.XkXwXp4nCf5azs0U, error.toString(), 'Incident', 'USERID']);
            // console.log(result);
            //errorLog(tx,'Report Incident', 'CreateIncident', JSON.stringify(oInput), error.toString(), 'Incident', 'USERID');
            console.error(error);
            if (tx) {
                await tx.rollback(error);
            }
            return error.toString();
        }
    })

    //Delete Body Part
    this.on("NtwF4uuInYgRwCMZ", async(req)=>{
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.XkXwXp4nCf5azs0U);
            const oDeleteBodyPart = oInput.DeleteBodyPart;
            tx = cds.transaction(req);

            result = await tx.run(`CALL "prDeleteBodyPart"(?,?)`,[setValue(oDeleteBodyPart.IBDID),setValue(oDeleteBodyPart.INCID)])
            console.log(result);

            //Audit log
            result = await tx.run(`CALL "prCreateAuditLog"(?,?,?,?,?,?)`, [setValue(oDeleteBodyPart.INCID),setValue(oDeleteBodyPart.INCID),'DeleteBodyPart','DeleteBodyPart',JSON.stringify(req.data.XkXwXp4nCf5azs0U),'ViewName']);
            console.log(result);
            //createAuditLog(oINCID,oINCID,'CreateIncidnt','CreateIncident',JSON.stringify(req.data.XkXwXp4nCf5azs0U),'ViewName');

            //Summary
            //result = await tx.run(`CALL "prCreateEventSummary"(?,?,?,?,?,?)`, [setValue(oDeleteBodyPart.INCID), 0, 0, 'Delete BodyPart', 'Delete BodyPart', 'Deleted']);
            //console.log(result);
            returnObj = {
                "Success":"Body part deleted",
                "Incident Id":oDeleteBodyPart.INCID
            }

            
            return JSON.stringify(returnObj);
        }
        catch(error){
            //Error log
            tx1 = cds.transaction(req);
            result = await tx1.run(`CALL "prCreateErrorLog"(?,?,?,?,?,?)`, ['Delete BodyPart', 'DeleteBodyPart', req.data.XkXwXp4nCf5azs0U, error.toString(), 'Incident', 'USERID']);
            // console.log(result);
            //errorLog(tx,'Report Incident', 'CreateIncident', JSON.stringify(oInput), error.toString(), 'Incident', 'USERID');
            console.error(error);
            if (tx) {
                await tx.rollback(error);
            }
            return error.toString();
        }
    })


    //Delete Injury Party
    this.on("vZD00EaYEDG4f9ey", async(req)=>{
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.XkXwXp4nCf5azs0U);
            const oDeleteInjuryParty = oInput.DeleteInjuryParty;
            tx = cds.transaction(req);

            result = await tx.run(`CALL "prDeleteInjuryParty"(?,?)`,[setValue(oDeleteInjuryParty.INJID),setValue(oDeleteInjuryParty.INCID)])
            console.log(result);

            //Audit log
            result = await tx.run(`CALL "prCreateAuditLog"(?,?,?,?,?,?)`, [setValue(oDeleteInjuryParty.INCID),setValue(oDeleteInjuryParty.INCID),'DeleteWitnessDetails','DeleteWitnessDetails',JSON.stringify(req.data.XkXwXp4nCf5azs0U),'ViewName']);
            console.log(result);
            //createAuditLog(oINCID,oINCID,'CreateIncidnt','CreateIncident',JSON.stringify(req.data.XkXwXp4nCf5azs0U),'ViewName');

            //Summary
            // result = await tx.run(`CALL "prCreateEventSummary"(?,?,?,?,?,?)`, [setValue(oDeleteInjuryParty.INCID), 0, 0, 'Delete Witness Details', 'Delete Witness Details', 'Deleted']);
            // console.log(result);
            //createSummary(oINCID, 0, 0, 'Report Incident', 'Incident Created', 'Created');

            // await tx.commit();
            return `{ \"Success\":\"Deleted Injury Party\", \"Incident Id\":${oDeleteInjuryParty.INCID} }`;
        }
        catch(error){
            //Error log
            tx1 = cds.transaction(req);
            result = await tx1.run(`CALL "prCreateErrorLog"(?,?,?,?,?,?)`, ['Delete Witness Details', 'DeleteWitnessDetails', req.data.XkXwXp4nCf5azs0U, error.toString(), 'Incident', 'USERID']);
            // console.log(result);
            //errorLog(tx,'Report Incident', 'CreateIncident', JSON.stringify(oInput), error.toString(), 'Incident', 'USERID');
            console.error(error);
            if (tx) {
                await tx.rollback(error);
            }
            return error.toString();
        }
    })

    //Delete Witness Details
    this.on("CrNynAetTbHNHqn3", async(req)=>{
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.XkXwXp4nCf5azs0U); 
            const oDeleteWitnessDetails = oInput.DeleteWitnessDetail;
            tx = cds.transaction(req); 

            result = await tx.run(`CALL "prDeleteWitnessDetails"(?,?)`,[setValue(oDeleteWitnessDetails.WITID),setValue(oDeleteWitnessDetails.INCID)]);
            console.log(result);

            //Audit log
            result = await tx.run(`CALL "prCreateAuditLog"(?,?,?,?,?,?)`, [setValue(oDeleteWitnessDetails.INCID),setValue(oDeleteWitnessDetails.INCID),'DeleteWitnessDetails','DeleteWitnessDetails',JSON.stringify(req.data.XkXwXp4nCf5azs0U),'ViewName']);
            console.log(result);
            //createAuditLog(oINCID,oINCID,'CreateIncidnt','CreateIncident',JSON.stringify(req.data.XkXwXp4nCf5azs0U),'ViewName');

            //Summary
            // result = await tx.run(`CALL "prCreateEventSummary"(?,?,?,?,?,?)`, [setValue(oDeleteWitnessDetails.INCID), 0, 0, 'Delete Witness Details', 'Delete Witness Details', 'Deleted']);
            // console.log(result);
            //createSummary(oINCID, 0, 0, 'Report Incident', 'Incident Created', 'Created');

            // await tx.commit();
            return `{ \"Success\":\"Deleted Witness Details\ ", \"Incident Id\":${oDeleteWitnessDetails.INCID} }`;
        }
        catch(error){
            //Error log
            tx1 = cds.transaction(req);
            result = await tx1.run(`CALL "prCreateErrorLog"(?,?,?,?,?,?)`, ['Delete Witness Details', 'DeleteWitnessDetails', req.data.XkXwXp4nCf5azs0U, error.toString(), 'Incident', 'USERID']);
            // console.log(result);
            //errorLog(tx,'Report Incident', 'CreateIncident', JSON.stringify(oInput), error.toString(), 'Incident', 'USERID');
            console.error(error);
            if (tx) {
                await tx.rollback(error);
            }
            return error.toString();
        }
    })
    // Pre-Investigation
    this.on("yv56xquyxyprnk1j", async(req)=>{
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.XkXwXp4nCf5azs0U);
            const oPreInvestigation = oInput.PreInvestigation;
            tx = cds.transaction(req);
            if(validateField(oPreInvestigation.PRIID)){
            result = await tx.run(`CALL "prCreateUpdatePreInvestigation" (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[ setValue(oPreInvestigation.PRIID), setValue(oPreInvestigation.INCID), 
            setValue(oPreInvestigation.ISMLC), setValue(oPreInvestigation.INLOC), setValue(oPreInvestigation.INJCD), setValue(oPreInvestigation.IJDEQ), setValue(oPreInvestigation.KNOHZ), setValue(oPreInvestigation.HZDES), 
            setValue(oPreInvestigation.WECON), setValue(oPreInvestigation.ILEVL), setValue(oPreInvestigation.STAFF), setValue(oPreInvestigation.WITSS), setValue(oPreInvestigation.SKTCH), setValue(oPreInvestigation.PNOTE), 
            setValue(oPreInvestigation.ISSVD), setValue(oPreInvestigation.PICOM)]);
            console.log(result); 
            
            const oPRIID = oPreInvestigation.PRIID == 0 ? await getSequenceNumber("INC_T_PRINV","PRIID") : oPreInvestigation.PRIID;

 
            for(var i =0;i<oPreInvestigation.ChainOfEvents.length;i++){
                result = await tx.run(`CALL "prCreateUpdateChainOfEvents" (?,?,?,?)`,[setValue(oPreInvestigation.ChainOfEvents[i].EIJID),setValue(oPreInvestigation.INCID),oPRIID,
                setValue(oPreInvestigation.ChainOfEvents[i].EVEDS)]);
                console.log(result);
            }

            for (var i = 0; i < oPreInvestigation.LinkedIncidents.length; i++) {
               
                result = await tx.run(`CALL "prCreateUpdateLinkedIncidents" (?,?,?,?,?)`,[setValue(oPreInvestigation.LinkedIncidents[i].LINID),setValue(oPreInvestigation.INCID),
                oPRIID,  setValue(oPreInvestigation.LinkedIncidents[i].LIKID),setValue(oPreInvestigation.LinkedIncidents[i].ISDEL)]);
                console.log(result);  
            }

            //Audit log
            result = await tx.run(`CALL "prCreateAuditLog"(?,?,?,?,?,?)`, [setValue(oPreInvestigation.INCID),setValue(oPreInvestigation.INCID),'pre-Investigation','pre-Investigation',JSON.stringify(req.data.XkXwXp4nCf5azs0U),'ViewName']);
            console.log(result);
            //createAuditLog(oINCID,oINCID,'CreateIncidnt','CreateIncident',JSON.stringify(req.data.XkXwXp4nCf5azs0U),'ViewName');

            //Summary
            result = await tx.run(`CALL "prCreateEventSummary"(?,?,?,?,?,?)`, [setValue(oPreInvestigation.INCID), 0, 0, 'pre-Investigation', 'pre-Investigation', oPreInvestigation.PRIID == 0 ? 'Created' : 'Updated']);
            console.log(result);
            //createSummary(oINCID, 0, 0, 'Report Incident', 'Incident Created', 'Created');

            //await tx.commit();
            return `{ \"Success\":\"Pre-Investigation\" , \"Incident Id\":${oPreInvestigation.INCID} }`;
            }
        }
        catch(error){
            //Error log
            tx1 = cds.transaction(req);
            result = await tx1.run(`CALL "prCreateErrorLog"(?,?,?,?,?,?)`, ['PreInvestigation', 'PreInvestigation', req.data.XkXwXp4nCf5azs0U, error.toString(), 'IncidentPortal', 'USERID']);
            // console.log(result);
            //errorLog(tx,'Report Incident', 'CreateIncident', JSON.stringify(oInput), error.toString(), 'Incident', 'USERID');
            console.error(error);
            if (tx) {
                await tx.rollback(error);
            }
            return error.toString();
        }
    })


    //Investigation
    this.on("w5uxxfmohlmuk1ag", async(req)=>{
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.XkXwXp4nCf5azs0U);
            const oInvestigationDetails = oInput.InvestigationDetails;
            tx = cds.transaction(req);
            if(validateField(oInvestigationDetails.INVID)){
                // Procedure for Investigation Details
	            result = await tx.run(`Call "prCreateUpdateInvestigation"(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[setValue(oInvestigationDetails.INVID), setValue(oInvestigationDetails.INCID), setValue(oInvestigationDetails.EXESM), setValue(oInvestigationDetails.INVSM), setValue(oInvestigationDetails.CONCL), setValue(oInvestigationDetails.EVONE), setValue(oInvestigationDetails.EVTWO), setValue(oInvestigationDetails.EVTHR), setValue(oInvestigationDetails.RCFAC), setValue(oInvestigationDetails.CATFA), setValue(oInvestigationDetails.ISSVD), setValue(oInvestigationDetails.CLOBY), setValue(oInvestigationDetails.CLODT), setValue(oInvestigationDetails.CLOTM), setValue(oInvestigationDetails.INVST)]);
	            console.log(result);

                const oINVID = oInvestigationDetails.INVID == 0 ? await getSequenceNumber("INC_T_INVST","INVID") : oInvestigationDetails.INVID;

	            for(var i = 0; i < oInvestigationDetails.InvestigationTeam.length; i++)
	            {
	            	// Procedure for Investigation Team
	            	result = await tx.run(`Call "prCreateUpdateInvestigationTeam"(?,?,?,?,?)`,[setValue(oInvestigationDetails.InvestigationTeam[i].ITMID), setValue(oInvestigationDetails.INCID), oINVID, setValue(oInvestigationDetails.InvestigationTeam[i].EMPID), setValue(oInvestigationDetails.InvestigationTeam[i].TITLE)]);
	            	console.log(result);
	            }
            
            
	            for(var i = 0; i < oInvestigationDetails.Fishbone.length; i++)
	            {
	            	// Procedure for Investigation Fishbone
	            	result = await tx.run(`Call "prCreateUpdateFishbone"(?,?,?,?)`,[setValue(oInvestigationDetails.Fishbone[i].FISID), oINVID, setValue(oInvestigationDetails.INCID), setValue(oInvestigationDetails.Fishbone[i].UNQID)]);
	            	console.log(result);
	            }
            
	            for(var i = 0; i < oInvestigationDetails.LessonsLearned.length; i++)
	            {
	            	// Procedure for Lessons Learned
	            	result = await tx.run(`Call "prCreateUpdateLessonsLearned"(?,?,?,?)`,[setValue(oInvestigationDetails.LessonsLearned[i].LLRID),setValue(oInvestigationDetails.INCID, oINVID), setValue(oInvestigationDetails.LessonsLearned[i].LLDSC)]);
	            	console.log(result);
	            }
            
	            for(var i = 0; i < oInvestigationDetails.CorrectiveAction.length; i++)
	            {
	            	// Procedure for Corrective Action
	            	result = await tx.run(`Call "prCreateUpdateCorrectiveAction"(?,?,?,?,?,?,?,?,?,?,?,?,?)`,[setValue(oInvestigationDetails.CorrectiveAction[i].CRAID), oINVID, setValue(oInvestigationDetails.INCID), setValue(oInvestigationDetails.CorrectiveAction[i].CAUSE), setValue(oInvestigationDetails.CorrectiveAction[i].CADSC), setValue(oInvestigationDetails.CorrectiveAction[i].CATEG), setValue(oInvestigationDetails.CorrectiveAction[i].CTYPE), setValue(oInvestigationDetails.CorrectiveAction[i].ASSID), setValue(oInvestigationDetails.CorrectiveAction[i].DUEDT), setValue(oInvestigationDetails.CorrectiveAction[i].CASTS), setValue(oInvestigationDetails.CorrectiveAction[i].CNOTE), setValue(oInvestigationDetails.CorrectiveAction[i].COMDT), setValue(oInvestigationDetails.CorrectiveAction[i].RASNT)]);
	            	console.log(result);
                
	            }

            //Audit log
            result = await tx.run(`CALL "prCreateAuditLog"(?,?,?,?,?,?)`, [setValue(oInvestigationDetails.INCID),setValue(oInvestigationDetails.INCID),'Investigation','Investigation',JSON.stringify(req.data.XkXwXp4nCf5azs0U),'ViewName']);
            console.log(result);
            //createAuditLog(oINCID,oINCID,'CreateIncidnt','CreateIncident',JSON.stringify(req.data.XkXwXp4nCf5azs0U),'ViewName');

            //Summary
            result = await tx.run(`CALL "prCreateEventSummary"(?,?,?,?,?,?)`, [setValue(oInvestigationDetails.INCID), 0, 0, 'Investigation', 'Investigation', 'Created']);
            console.log(result);
            //createSummary(oINCID, 0, 0, 'Report Incident', 'Incident Created', 'Created');

            
            return `{ \"Success\":\"Investigation\" , \"Incident Id\":${oInvestigationDetails.INCID} }`;
            }
        }
        catch(error){
            //Error log
            tx1 = cds.transaction(req);
            result = await tx1.run(`CALL "prCreateErrorLog"(?,?,?,?,?,?)`, ['Investigation', 'Investigation', req.data.XkXwXp4nCf5azs0U, error.toString(), 'IncidentPortal', 'USERID']);
            // console.log(result);
            //errorLog(tx,'Report Incident', 'CreateIncident', JSON.stringify(oInput), error.toString(), 'Incident', 'USERID');
            console.error(error);
            if (tx) {
                await tx.rollback(error);
            }
            return error.toString();
        }
    })

    //Report Sign Off
    this.on("as2srlphvuf5juj6", async(req)=>{
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.XkXwXp4nCf5azs0U);
            const oReportSignOff = oInput.ReportSignOff;
            tx = cds.transaction(req);
            if(validateField(oReportSignOff.SIGID)){
                result = await tx.run(`Call "prCreateUpdateSignOff"(?,?,?,?,?,?,?,?)`,[setValue(oReportSignOff.SIGID), setValue(oReportSignOff.INCID), setValue(oReportSignOff.INVID), setValue(oReportSignOff.RSIGN), setValue(oReportSignOff.SFONT), setValue(oReportSignOff.SOLAG), setValue(oReportSignOff.NOTES), setValue(oReportSignOff.EMPID)])
                console.log(result);

                //Audit log
                result = await tx.run(`CALL "prCreateAuditLog"(?,?,?,?,?,?)`, [setValue(oReportSignOff.INCID),setValue(oReportSignOff.INCID),'Report Sign Off','Report Sign Off',JSON.stringify(req.data.XkXwXp4nCf5azs0U),'ViewName']);
                console.log(result);
                //createAuditLog(oINCID,oINCID,'CreateIncidnt','CreateIncident',JSON.stringify(req.data.XkXwXp4nCf5azs0U),'ViewName');

                //Summary
                result = await tx.run(`CALL "prCreateEventSummary"(?,?,?,?,?,?)`, [setValue(oReportSignOff.INCID), 0, 0, 'Report Sign Off', 'Report Sign Off', 'Created']);
                console.log(result);
                //createSummary(oINCID, 0, 0, 'Report Incident', 'Incident Created', 'Created');

            
                return `{ \"Success\":\"Report Sign Off\" , \"Incident Id\":${oReportSignOff.INCID} }`;
            }
        }
        catch(error){
            //Error log
            tx1 = cds.transaction(req);
            result = await tx1.run(`CALL "prCreateErrorLog"(?,?,?,?,?,?)`, ['Report Sign Off', 'Report Sign Off', req.data.XkXwXp4nCf5azs0U, error.toString(), 'IncidentPortal', 'USERID']);
            // console.log(result);
            //errorLog(tx,'Report Incident', 'CreateIncident', JSON.stringify(oInput), error.toString(), 'Incident', 'USERID');
            console.error(error);
            if (tx) {
                await tx.rollback(error);
            }
            return error.toString();
        }
    })

    //Follow-Up
    this.on("vrvzops9ly3tyiui", async(req)=>{
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.XkXwXp4nCf5azs0U);
            const oFollowUpDetails = oInput.FollowUpDetails;
            tx = cds.transaction(req); 
            if(validateField(oFollowUpDetails.FUPID)){
                result = await tx.run(`CALL "prCreateUpdateFollowUp"(?,?,?)`,[setValue(oFollowUpDetails.FUPID),setValue(oFollowUpDetails.INCID),setValue(oFollowUpDetails.NOTES)])
                console.log(result);
                
                const oFUPID = oFollowUpDetails.FUPID == 0 ? await getSequenceNumber("INC_T_FOLUP","FUPID") : oFollowUpDetails.FUPID;

	            for(var i = 0; i < oFollowUpDetails.SendTo.length; i++)
	            {
	            	result = await tx.run(`CALL "prCreateUpdateFollowUpSendTo"(?,?,?)`,[setValue(oFollowUpDetails.SendTo[i].FSTID),oFUPID,setValue(oFollowUpDetails.SendTo[i].EMPID)])
                        	console.log(result);
	            }

                //Audit log
                result = await tx.run(`CALL "prCreateAuditLog"(?,?,?,?,?,?)`, [setValue(oFollowUpDetails.INCID),setValue(oFollowUpDetails.INCID),'FollowUp','FollowUp',JSON.stringify(req.data.XkXwXp4nCf5azs0U),'ViewName']);
                console.log(result);
                //createAuditLog(oINCID,oINCID,'CreateIncidnt','CreateIncident',JSON.stringify(req.data.XkXwXp4nCf5azs0U),'ViewName');

                //Summary
                result = await tx.run(`CALL "prCreateEventSummary"(?,?,?,?,?,?)`, [setValue(oFollowUpDetails.INCID), 0, 0, 'FollowUp', 'FollowUp', 'Created']);
                console.log(result);
                //createSummary(oINCID, 0, 0, 'Report Incident', 'Incident Created', 'Created');

            
                return `{ \"Success\":\"FollowUp\" , \"Incident Id\":${oFollowUpDetails.INCID} }`;
            }
        }
        catch(error){
            //Error log
            tx1 = cds.transaction(req);
            result = await tx1.run(`CALL "prCreateErrorLog"(?,?,?,?,?,?)`, ['FollowUp', 'FollowUp', req.data.XkXwXp4nCf5azs0U, error.toString(), 'IncidentPortal', 'USERID']);
            // console.log(result);
            //errorLog(tx,'Report Incident', 'CreateIncident', JSON.stringify(oInput), error.toString(), 'Incident', 'USERID');
            console.error(error);
            if (tx) {
                await tx.rollback(error);
            }
            return error.toString();
        }
    })

    //Delete Investigation Team
    this.on("xksfxrsnnvml2pzk", async(req)=>{
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.XkXwXp4nCf5azs0U);
            const oDeleteInvestigationTeam = oInput.DeleteInvestigationTeam ;
            tx = cds.transaction(req);

            result = await tx.run(`CALL "prDeleteInvestigationTeam"(?,?)`,[setValue(oDeleteInvestigationTeam.ITMID),setValue(oDeleteInvestigationTeam.INCID)])
            console.log(result);

            //Audit log
            result = await tx.run(`CALL "prCreateAuditLog"(?,?,?,?,?,?)`, [setValue(oDeleteInvestigationTeam.INCID),setValue(oDeleteInvestigationTeam.INCID),'DeleteInvestigationTeam','DeleteInvestigationTeam',JSON.stringify(req.data.XkXwXp4nCf5azs0U),'ViewName']);
            console.log(result);
            //createAuditLog(oINCID,oINCID,'CreateIncidnt','CreateIncident',JSON.stringify(req.data.XkXwXp4nCf5azs0U),'ViewName');

            //Summary
            result = await tx.run(`CALL "prCreateEventSummary"(?,?,?,?,?,?)`, [setValue(oDeleteInvestigationTeam.INCID), 0, 0, 'InvestigationTeam', 'DeleteInvestigationTeam', 'Deleted']);
            console.log(result);
            //createSummary(oINCID, 0, 0, 'Report Incident', 'Incident Created', 'Created');

            returnObj = {
                "Success":"Investigation Team Deleted",
                "Incident Id": oDeleteInvestigationTeam.INCID
            }
            return JSON.stringify(returnObj);
        }
        catch(error){
            //Error log
            tx1 = cds.transaction(req);
            result = await tx1.run(`CALL "prCreateErrorLog"(?,?,?,?,?,?)`, ['Delete Investigation Team', 'DeleteInvestigationTeam', req.data.XkXwXp4nCf5azs0U, error.toString(), 'Incident', 'USERID']);
            // console.log(result);
            //errorLog(tx,'Report Incident', 'CreateIncident', JSON.stringify(oInput), error.toString(), 'Incident', 'USERID');
            console.error(error);
            if (tx) {
                await tx.rollback(error);
            }
            return error.toString();
        }
    })

    //Delete Chain of Events
    this.on("eddl7wz9zoatww19", async(req)=>{
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.XkXwXp4nCf5azs0U);
            const oDeleteChainOfEvents = oInput.DeleteChainOfEvents ;
            tx = cds.transaction(req);

            result = await tx.run(`CALL "prDeleteChainOfEvents"(?,?)`,[setValue(oDeleteChainOfEvents.EIJID),setValue(oDeleteChainOfEvents.INCID)])
            console.log(result);

            //Audit log
            result = await tx.run(`CALL "prCreateAuditLog"(?,?,?,?,?,?)`, [setValue(oDeleteChainOfEvents.INCID),setValue(oDeleteChainOfEvents.INCID),'DeleteChainofEvent','DeleteChainofEvent',JSON.stringify(req.data.XkXwXp4nCf5azs0U),'ViewName']);
            console.log(result);
            //createAuditLog(oINCID,oINCID,'CreateIncidnt','CreateIncident',JSON.stringify(req.data.XkXwXp4nCf5azs0U),'ViewName');

            //Summary
            result = await tx.run(`CALL "prCreateEventSummary"(?,?,?,?,?,?)`, [setValue(oDeleteChainOfEvents.INCID), 0, 0, 'InvestigationTeam', 'DeleteChainofEvent', 'Deleted']);
            console.log(result);
            //createSummary(oINCID, 0, 0, 'Report Incident', 'Incident Created', 'Created');

            // await tx.commit();
            return `{ \"Success\":\"Deleted Chain of events\" , \"Incident Id\":${oDeleteChainOfEvents.INCID} }`;
        }
        catch(error){
            //Error log
            tx1 = cds.transaction(req);
            result = await tx1.run(`CALL "prCreateErrorLog"(?,?,?,?,?,?)`, ['Delete Chain of events', 'DeleteChainofEvent', req.data.XkXwXp4nCf5azs0U, error.toString(), 'Incident', 'USERID']);
            console.log(result);
            // //createErrorLog('Delete Chain Of Events', 'DeleteChainOfEvents', JSON.stringify(oInput), error.toString(), 'Incident', 'USERID');
            // console.log(error.toString());
            if (tx) {
                await tx.rollback(error); 
            }
            return error.toString();
        }
    })

    //Delete Corrective Action
    this.on("d2hhhqmepsgh7g3i", async(req)=>{
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.XkXwXp4nCf5azs0U);
            const oDeleteCorrectiveAction = oInput.DeleteCorrectiveAction ;
            tx = cds.transaction(req);

            result = await tx.run(`CALL "prDeleteCorrectiveAction"(?,?)`,[setValue(oDeleteCorrectiveAction.CRAID),setValue(oDeleteCorrectiveAction.INCID)])
            console.log(result);

            //Audit log
            result = await tx.run(`CALL "prCreateAuditLog"(?,?,?,?,?,?)`, [setValue(oDeleteCorrectiveAction.INCID),setValue(oDeleteCorrectiveAction.INCID),'DeleteCorrectiveAction','DeleteCorrectiveAction',JSON.stringify(req.data.XkXwXp4nCf5azs0U),'ViewName']);
            console.log(result);
            //createAuditLog(oINCID,oINCID,'CreateIncidnt','CreateIncident',JSON.stringify(req.data.XkXwXp4nCf5azs0U),'ViewName');

            //Summary
            result = await tx.run(`CALL "prCreateEventSummary"(?,?,?,?,?,?)`, [setValue(oDeleteCorrectiveAction.INCID), 0, 0, 'CorrectiveAction', 'DeleteCorrectiveAction', 'Deleted']);
            console.log(result);
            //createSummary(oINCID, 0, 0, 'Report Incident', 'Incident Created', 'Created');

            // await tx.commit();
            return `{ \"Success\":\"Deleted Corrective Action\" , \"Incident Id\":${oDeleteCorrectiveAction.INCID} }`;
        }
        catch(error){
            //Error log
            tx1 = cds.transaction(req);
            result = await tx1.run(`CALL "prCreateErrorLog"(?,?,?,?,?,?)`, ['Delete CorrectiveAction', 'DeleteCorrectiveAction', req.data.XkXwXp4nCf5azs0U, error.toString(), 'Incident', 'USERID']);
            console.log(result);

            if (tx) {
                await tx.rollback(error); 
            }
            return error.toString();
        }
    })

    //Delete Lesson Learned
    this.on("i5j7kek2aqkevyca", async(req)=>{
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.XkXwXp4nCf5azs0U);
            const oDeleteLessonLearned = oInput.DeleteLessonLearned ;
            tx = cds.transaction(req);

            result = await tx.run(`CALL "prDeleteLessonLearn"(?,?)`,[setValue(oDeleteLessonLearned.LLRID),setValue(oDeleteLessonLearned.INCID)])
            console.log(result);

            //Audit log
            result = await tx.run(`CALL "prCreateAuditLog"(?,?,?,?,?,?)`, [setValue(oDeleteLessonLearned.INCID),setValue(oDeleteLessonLearned.INCID),'DeleteLessonLearned','DeleteLessonLearned',JSON.stringify(req.data.XkXwXp4nCf5azs0U),'ViewName']);
            console.log(result);
            //createAuditLog(oINCID,oINCID,'CreateIncidnt','CreateIncident',JSON.stringify(req.data.XkXwXp4nCf5azs0U),'ViewName');

            //Summary
            result = await tx.run(`CALL "prCreateEventSummary"(?,?,?,?,?,?)`, [setValue(oDeleteLessonLearned.INCID), 0, 0, 'Lesson Learned', 'Delete Lesson Learned', 'Deleted']);
            console.log(result);
            //createSummary(oINCID, 0, 0, 'Report Incident', 'Incident Created', 'Created');

            // await tx.commit();
            return `{ \"Success\":\"Delete Lesson Learned\" , \"Incident Id\":${oDeleteLessonLearned.INCID} }`;
        }
        catch(error){
            //Error log
            tx1 = cds.transaction(req);
            result = await tx1.run(`CALL "prCreateErrorLog"(?,?,?,?,?,?)`, ['Delete Lesson Learned', 'DeleteLessonLearned', req.data.XkXwXp4nCf5azs0U, error.toString(), 'Incident', 'USERID']);
            console.log(result);

            if (tx) {
                await tx.rollback(error); 
            }
            return error.toString();
        }
    })

    //Close Incident
    this.on("bzdL4LlCePu94OI9", async(req)=>{
        try{
            let result;
            payload = req.data;
            oInput = JSON.parse(payload.XkXwXp4nCf5azs0U);
            const oCloseIncident = oInput.CloseIncident ;
            tx = cds.transaction(req);

            result = await tx.run(`CALL "prUpdateCloseIncident"(?)`,[setValue(oCloseIncident.INCID)])
            console.log(result);

            //Audit log
            result = await tx.run(`CALL "prCreateAuditLog"(?,?,?,?,?,?)`, [setValue(oCloseIncident.INCID),setValue(oCloseIncident.INCID),'CloseIncident','CloseIncident',JSON.stringify(req.data.XkXwXp4nCf5azs0U),'ViewName']);
            console.log(result);
            //createAuditLog(oINCID,oINCID,'CreateIncidnt','CreateIncident',JSON.stringify(req.data.XkXwXp4nCf5azs0U),'ViewName');

            //Summary
            result = await tx.run(`CALL "prCreateEventSummary"(?,?,?,?,?,?)`, [setValue(oCloseIncident.INCID), 0, 0, 'Close Incident', 'Close Incident', 'Updated']);
            console.log(result);
            //createSummary(oINCID, 0, 0, 'Report Incident', 'Incident Created', 'Created');

            // await tx.commit();
            return `{ \"Success\":\"Close Incident\" , \"Incident Id\":${oCloseIncident.INCID} }`;
        }
        catch(error){
            //Error log
            tx1 = cds.transaction(req);
            result = await tx1.run(`CALL "prCreateErrorLog"(?,?,?,?,?,?)`, ['Close Incident', 'CloseIncident', req.data.XkXwXp4nCf5azs0U, error.toString(), 'Incident', 'USERID']);
            console.log(result);

            if (tx) {
                await tx.rollback(error); 
            }
            return error.toString();
        }
    })

})