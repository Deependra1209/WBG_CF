namespace INC;

context M{
    @cds.persistence.exists
    entity MASTERDATA(){
        key UNQID : Integer;
        TXVAL : String(1000);
        TYVAL : String(250);
        COLID : Integer;
        TYDES : String(1000);
    }

    @cds.persistence.exists
    entity EMPLOYEEDATA(){
        key EMPID : String(30);
        EMPNM : String(250);
        EMPML : String(250);
        MGRID : String(30);
        MGRNM : String(250);
        USRID : String(30);
        POSIT : String(200);
        DEPTC : String(10);
        DEPNM : String(200);
        PHONE : String(50);
        SUPID : String(30);
        SUPNM : String(250);
        EUNIT : String(250);
        SUPML : String(250);
        CNTRY : String(250);
        LICNM : String(250);
        EMUPI : String(100);
        VCPNM : String(100);
        ECITY : String(500);
    }

    @cds.persistence.exists
    entity SESSIONUSERDT(){
        key EMPID : String(30);
        EMPNM : String(250);
        EMAIL : String(250);
        MGRID : String(30);
        MGRNM : String(250);
        USRID : String(30);
        POSIT : String(200);
        DEPTC : String(10);
        DEPNM : String(200);
        PHONE : String(50);
        EMUPI : String(100);
        VCPNM : String(100);
        EUNIT : String(100);
        ECITY : String(500);
    }
    @cds.persistence.exists
    entity NATUREOFINJURY(){
        key BDNID : Integer;
        BDPID : Integer;
        NATID : Integer;
        TXVAL : String(500);
    }
    @cds.persistence.exists
    entity BODYPART(){
        key UNQID : Integer;
        SEQID : Integer;
        TXVAL : String(100);
        TYVAL : String(50);
    }

    @cds.persistence.exists
    entity BODYPARTSIDE(){
        key BDSID : Integer;
        BDPID : Integer;
        SIDID : Integer;
        TXVAL : String(500);
    }

    @cds.persistence.exists
    entity FISHBONEANALYSIS(){
        key UNQID : Integer;
        SEQID : Integer;
        TXVAL : String(100);
        TYVAL : String(10);
    }

    @cds.persistence.exists
    entity SCATANALYSIS(){
        key  UNQID : Integer;
        TYVAL : String(50);
        TXVAL : String(100);
        PRNID : Integer;
        SEQID : Integer;
    }


}

context OHS {
    @cds.persistence.exists
    entity LANDINGPAGE(){
        key INCID:Integer;
        OTRMN:String(10);
        INCNM:String(50);
        INCDT:Date;
        INCST:Integer;
        INCSTTXT:String(1000);
        CLASS:Integer;
        CLASSTXT:String(1000);
        INCTPTX:String(5000);
        NAOIN:String(5000);
        CNTIR:String(1000);
        EMPNM:String(5000);
        INCTP:String(5000);
        ISAVE : Integer;
        NRMDT :Date;
        NMRDT:Date;
        NRMTM:Time;
        NMRTM:Time;
        INCCN:Integer;
        INCCNTXT:String(1000);
        LOCTN:String(100);
        LODES:String(1000);
        SUMMARY : Association to many SUMMARY on SUMMARY.INCID=INCID;
        INCIDENTDETAILS : Association to many INCIDENTDETAILS on INCIDENTDETAILS.INCID=INCID;
        PREINVESTIGATION : Association to many PREINVESTIGATION on PREINVESTIGATION.INCID=INCID;
        INVESTIGATIONDETAILS : Association to many INVESTIGATIONDETAILS on INVESTIGATIONDETAILS.INCID=INCID;
        FOLLOWUP : Association to many FOLLOWUP on FOLLOWUP.INCID=INCID;
        ATTACHMENTS : Association to many ATTACHMENTS on ATTACHMENTS.INCID=INCID;
    }

    @cds.persistence.exists
    entity SUMMARY(){
        key EVNID : Integer;
        INCID : Integer;
        SECTN : String(50);
        UDATE : Date;
        UTIME : Time;
        UPDBY : String(100);
        DETLS : String(100);
        NOTES : String(5000);
        PRFLW : Integer;

    }

    @cds.persistence.exists
    entity PREINVESTIGATION() {
        key PRIID  : Integer;
        INCID  : Integer;
        ISMLC  : Integer;
        INLOC  : String(100);
        INJCD  : String(100);
        IJDEQ  : String(100);
        KNOHZ  : Integer;
        HZDES  : String(100);
        WECON  : String(100);
        ILEVL  : Integer;
        ILEVLTXT : String(1000);
        STAFF  : String(5000);
        WITSS  : String(5000);
        SKTCH  : String(5000);
        PNOTE  : String(5000);
        ISSVD  : String(1);
        PICOM  : Integer;
        CHAINOFEVENT : Association to many CHAINOFEVENT on CHAINOFEVENT.PRIID=PRIID;
        LINKEDINCIDENTS : Association to many LINKEDINCIDENTS on LINKEDINCIDENTS.PRIID=PRIID;
    }

    @cds.persistence.exists
    entity CHAINOFEVENT() {
        key EIJID  : Integer;
        INCID  : Integer;
        PRIID  : Integer;
        EVEDS  : String(5000);
    }

    @cds.persistence.exists
    entity LINKEDINCIDENTS() {
        key LINID  : Integer;
        INCID  : Integer;
        PRIID  : Integer;
        LIKID  : Integer;
        LIKIDTXT:String(1000);
    }

    @cds.persistence.exists
    entity INVESTIGATIONDETAILS() {
        key INVID  : Integer;
        INCID  : Integer;
        EXESM  : String(5000);
        INVSM  : String(5000);
        CONCL  : String(5000);
        EVONE  : String(5000);
        EVTWO  : String(5000);
        EVTHR  : String(5000);
        RCFAC  : Integer;
        RCFAC_TXT:String(1000);
        CATFA  : String(5000);
        ISSVD  : String(1);
        CLOBY  : String(30);
        CLODT  : Date;
        CLOTM  : Time;
        INVST  : Integer;
        INVST_TXT:String(1000);
        INVESTIGATIONTEAM : Association to many INVESTIGATIONTEAM on INVESTIGATIONTEAM.INVID=INVID;
        INVESTIGATIONFISHBONE : Association to many INVESTIGATIONFISHBONE on INVESTIGATIONFISHBONE.INVID=INVID;
        LESSONSLEARNED : Association to many LESSONSLEARNED on LESSONSLEARNED.INVID=INVID;
        REPORTSIGNOFF : Association to many REPORTSIGNOFF on REPORTSIGNOFF.INVID=INVID;
        CORRECTIVEACTION : Association to many CORRECTIVEACTION on CORRECTIVEACTION.INVID=INVID;
    }

    @cds.persistence.exists
    entity INVESTIGATIONTEAM() {
        key ITMID  : Integer;
        INCID  : Integer;
        INVID  : Integer;
        EMPID  : String(30);
        TITLE  : Integer;
        TITLE_TXT:String(1000);
    }

    @cds.persistence.exists
    entity INVESTIGATIONFISHBONE() {
        key FISID  : Integer;
        INVID  : Integer;
        INCID  : Integer;
        UNQID  : Integer;
        UNQID_TXT:String(100);
    }

    @cds.persistence.exists
    entity LESSONSLEARNED() {
        key LLRID  : Integer;
        INCID  : Integer;
        INVID  : Integer;
        LLDSC  : String(5000);
    }

    @cds.persistence.exists
    entity REPORTSIGNOFF() {
        key SIGID  : Integer;
        INCID  : Integer;
        INVID  : Integer;
        RSIGN  : String(5000);   // CLOB
        SFONT  : String(50);
        SOLAG  : String(1);
        NOTES  : String(1000);
        EMPID  : String(30);
        SIGNM : String(250);
    }

    @cds.persistence.exists
    entity FOLLOWUP() {
        key FUPID  : Integer;
        INCID  : Integer;
        NOTES  : String(5000);
        FOLLOWUPSENDTO : Association to many FOLLOWUPSENDTO on FOLLOWUPSENDTO.FUPID=FUPID;
    }

    @cds.persistence.exists
    entity FOLLOWUPSENDTO() {
        key FSTID  : Integer;
        FUPID  : Integer;
        EMPID  : String(30);
        FSTNM : String(250);
    }


    @cds.persistence.exists
    entity INCIDENTDETAILS() {
        key INCID : Integer;
            INCNM : String(20);
            CLASS : Integer;
            OTRMN : Integer;
            REPOB : Integer;
            ORGZN : String(50);
            REPPR : String(100);
            INUPI : String(100);
            INCVP : String(100);
            IUNIT : String(100);
            INCDT : Date;
            INCTM : Time;
            INCLC : Integer;
            INCLC_TXT : String(1000);
            CNTIR : Integer;
            CNTIR_TXT : String(1000);
            INRDT : Date;
            INRTM : Time;
            LODES : String(1000);
            INDES : String(5000);
            REGNO : Integer;
            WORKC : Integer;
            WITBY : Integer;
            WITBY_TXT : String(1000);
            ISAVE : Integer;
            INCST : Integer;
            PRINV : Integer;
            INVFL : Integer;
            SNGFL : Integer;
            ATTFL : Integer;
            CLASSTXT : String(1000);
            INCTP  : String(1000);
            INCTPTXT : String(5000);
            INCIDENTTYPE : Association to many INCIDENTTYPE on INCIDENTTYPE.INCID=INCID;
            DETAILSOFINJURED : Association to many DETAILSOFINJURED on DETAILSOFINJURED.INCID=INCID;
            WITNESSDETAILS : Association to many WITNESSDETAILS on WITNESSDETAILS.INCID=INCID;
            ENVIRONMENTAL : Association to many ENVIRONMENTAL on ENVIRONMENTAL.INCID=INCID;
            FIREEXPLOSION : Association to many FIREEXPLOSION on FIREEXPLOSION.INCID = INCID;
            TRANSPORTATION : Association to many TRANSPORTATION on TRANSPORTATION.INCID =INCID;
            OFFICIALTRAVELMISSION : Association to many  OFFICIALTRAVELMISSION on OFFICIALTRAVELMISSION.INCID=INCID;
            ATTACHMENTS : Association to many ATTACHMENTS on ATTACHMENTS.INCID=INCID;
            NEARMISS : Association to many NEARMISS on NEARMISS.INCID=INCID;
            
    }

    

    @cds.persistence.exists
    entity INCIDENTTYPE() {
        key ITPID : Integer;
            INCID: Integer;
            INCTP : Integer;
            INCTP_TXT : String(1000);
    }

    @cds.persistence.exists
    entity DETAILSOFINJURED() {
        key INJID : Integer;  // Primary Key
            INCID : Integer;
            EMPTP : Integer;  // SmallInteger as Integer
            EMPTP_TXT : String(1000);
            NAOIN : String(100);
            INUPI : String(100);
            INCVP : String(100);
            EUNIT : String(100);
            REGON : String(100);
            ECITY : String(100);
            NSOTL : String(100);
            ESOTL : String(50);
            CNTRY : Integer;
            CNTRY_TXT: String(1000);
            ORGAN : String(50);
            EASNS : String(50);
            PPNON : String(25);
            PERSONALINJURYILLNESS : Association to many PERSONALINJURYILLNESS on PERSONALINJURYILLNESS.INJID = INJID;
    }

    @cds.persistence.exists
    entity WITNESSDETAILS() {
        key WITID : Integer;  // Primary Key
            INCID : Integer;
            WITTP : Integer;  // SmallInteger as Integer
            WITTP_TXT:String(1000);
            WITNM : String(100);
            WITPN : String(30);
            WITEM : String(250);
            NRMID : Integer;
    }


    @cds.persistence.exists
    entity PERSONALINJURYILLNESS() {
        key PRIID : Integer;  // Primary Key
            INCID : Integer;
            INJID : Integer;
            LTRTQ : Integer;
            LTRTQ_TXT:String(1000);
            WTIMF : Integer;  // SmallInteger as Integer
            WBBFE : Integer;  // SmallInteger as Integer
            WBSPT : Integer;  // SmallInteger as Integer
            WHDTE : String(100);
            TOBBF : Integer;
            TOBBF_TXT:String(1000);
            OTHER : String(100);
            INJUREDBODYPARTNATURE : Association to many INJUREDBODYPARTNATURE on INJUREDBODYPARTNATURE.PRIID=PRIID;
    }

    @cds.persistence.exists
    entity INJUREDBODYPARTNATURE() {
        key IBDID : Integer;  // Primary Key
            INCID : Integer;
            PRIID : Integer;
            BODPT : Integer;
            BODPT_TXT:String(1000);
            NOIIL : Integer;
            NOIIL_TXT:String(1000);
            SIDEY : Integer;
            SIDEY_TXT:String(1000);
    }

    @cds.persistence.exists
    entity ENVIRONMENTAL() {
        key ENVID : Integer;  // Primary Key
            INCID : Integer;
            WESCD : Integer;  // SmallInteger as Integer
            PRLOC : Integer;  // SmallInteger as Integer
            PRLOC_TXT:String(1000);
            DESLO : String(1000);
            PRSDC : String(5000);
            SRTDS : String(100);  // Use DateTime for TIMESTAMP
            ENDDS : String(100);  // Use DateTime for TIMESTAMP
            WCTTR : String(100);
            TSROS : Integer;  // SmallInteger as Integer
            TSROS_TXT:String(1000);
            EQSRD : String(20);
            UNMNT : String(50);
            ISCON : Integer;  // SmallInteger as Integer
            WCRLS : String(100);
            WRSCN : Integer;  // SmallInteger as Integer
            WIMRT : Integer;  // SmallInteger as Integer
            CNMSS : String(100);
            ADCOM : String(1000);
            RELEASEDTO: Association to many  RELEASEDTO on RELEASEDTO.ENVID=ENVID;
    }

    @cds.persistence.exists
    entity RELEASEDTO() {
        key RSLID : Integer;  // Primary Key
            ENVID : Integer;
            INCID : Integer;
            RLTOI : Integer;
            RLTOI_TXT:String(1000);
    } 

    @cds.persistence.exists
    entity FIREEXPLOSION() {
        key FREID : Integer;  // Primary Key
            INCID : Integer;
            EQPUD : String(100);
            IRTES : Time;
            WAEVD : Integer;  // SmallInteger as Integer
            DWASD : String(100);
            COINC : String(1000);
            WIRMT : Integer;  // SmallInteger as Integer

    } 

    @cds.persistence.exists
    entity TRANSPORTATION() {
        key TRSID : Integer;  // Primary Key
            INCID : Integer;
            TYPTR : Integer;
            TYPTR_TXT:String(1000);
            LOCXX : String(30);
            SPEXX : Integer;  // SmallInteger as Integer
            POLIV : Integer;  // SmallInteger as Integer
            ACTTI : String(100);
            OPASS : Integer;  // SmallInteger as Integer
            INJUR : Integer;  // SmallInteger as Integer
            OVCXX : String(100);
            VEIID : String(100);
            MDLYR : String(4);
            VECDS : String(100);
            PCVXX : String(50);
    } 

    @cds.persistence.exists
    entity OFFICIALTRAVELMISSION() {
        key OFTID : Integer;  // Primary Key
            INCID : Integer;
            RFTVL : Integer;
            RFTVL_TXT:String(1000);
            INCLC : String(100);
            LCDES : String(100);
            LOCIN : String(50);
            ACTTI : String(50);
            WIRMT : Integer;  // SmallInteger as Integer
    } 

    @cds.persistence.exists
    entity ATTACHMENTS() {
        key ATTID : Integer;  // Primary Key
            INCID : Integer;
            FLTTL : String(30);
            FILTP : String(30);
            FLDES : String(5000);
            ISCON : Integer;  // SmallInteger as Integer
            OBJCT : String(50);
    } 

    @cds.persistence.exists
    entity NEARMISS() {
        key NRMID : Integer;  // Primary Key
            INCID : Integer;
            NRMDT : Date;
            NMRDT : Date;
            NRMTM : Time;
            NMRTM : Time;
            WEACN : String(100);
            INCCN : Integer;  // SmallInteger as Integer
            INCCN_TXT:String(1000);
            LOCTN : String(100);
            OFFTR : Integer;  // SmallInteger as Integer
            OFFTR_TXT:String(1000);
            NMDES : String(5000);
            WITBY : Integer;  // SmallInteger as Integer
            WITBY_TXT:String(1000);
            TYPEOFNEARMISS:Association to many TYPEOFNEARMISS on TYPEOFNEARMISS.NRMID=NRMID;
            POTENTIALNEARMISS : Association to many  POTENTIALNEARMISS on POTENTIALNEARMISS.NRMID=NRMID;
            WITNESSDETAILS : Association to many WITNESSDETAILS on WITNESSDETAILS.NRMID=NRMID;
    }

    @cds.persistence.exists
    entity POTENTIALNEARMISS() {
        key NMPID : Integer;  // Primary Key
            INCID : Integer;
            NRMID : Integer;
            NRMPT : Integer;  // SmallInteger as Integer
            NRMPT_TXT:String(1000);
    }

    @cds.persistence.exists
    entity TYPEOFNEARMISS() {
        key NMTID : Integer;  // Primary Key
            INCID : Integer;
            NRMID : Integer;
            NRMTP : Integer;  // SmallInteger as Integer
            NRMTP_TXT : String(1000);
    }

    @cds.persistence.exists
    entity CORRECTIVEACTION() {
        key CRAID : Integer;
        INVID : Integer;
        INCID : Integer;
        CAUSE : String(500);
        CADSC : String(1000);
        CATEG : Integer;
        CATEGTXT : String(1000);
        CTYPE : Integer;
        CTYPETXT : String(1000);
        ASSID : String(30);
        ASSNM : String(1000);
        DUEDT : Date;
        CASTS : Integer;
        CASTSTXT : String(1000);
        CNOTE : String(200);
        COMDT : Date;
        RASNT : String(1000);
        CRTBY : String(30);
        CRTNM : String(500);
        CRTDT : Date;
    }

    

}
