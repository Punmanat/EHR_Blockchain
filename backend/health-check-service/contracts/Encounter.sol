contract EncounterContract {
    struct Encounter {
        // ID, Class, Subject, Participant, ServiceProvider, Issued, ReasonCode
        string personalId;
        string encounterId;
        bytes32 documentHash;
    }

    mapping(string => bytes32[]) personalIdToEncounter;
    mapping(string => bytes32) encounterIdToEncounter;

    //Set Encounter
    function setEncounter(
        string memory personalId,
        string memory encounterId,
        bytes32 documentHash
    ) public {
        Encounter memory encounter;
        encounter.personalId = personalId;
        encounter.encounterId = encounterId;
        encounter.documentHash = documentHash;
        personalIdToEncounter[personalId].push(documentHash);
        encounterIdToEncounter[encounterId] = documentHash;
    }

    //Get Encounter by encounterId
    function getEncounterByEncounterId(string memory encounterId)
        public
        view
        returns (bytes32)
    {
        return encounterIdToEncounter[encounterId];
    }

    //Get ALL Encounter of patient
    function getEncounterByPersonalId(string memory personalId)
        public
        view
        returns (bytes32[] memory)
    {
        return personalIdToEncounter[personalId];
    }
}
