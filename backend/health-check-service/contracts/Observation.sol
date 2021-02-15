contract ObservationContract {
    struct Observation {
        // ID, Class, Subject, Participant, ServiceProvider, Issued, ReasonCode
        string personalId;
        string observationId;
        bytes32 documentHash;
    }
    // mapping(string => bytes32[]) personalIdToObservation;
    mapping(string => bytes32) observationIdToObservation;
    mapping(string => bytes32[]) encounterIdToObservation;

    //Set Observation
    function setObservation(
        string memory personalId,
        string memory observationId,
        string memory encounterId,
        bytes32 documentHash
    ) public {
        Observation memory observation;
        observation.personalId = personalId;
        observation.observationId = observationId;
        observation.documentHash = documentHash;
        // personalIdToObservation[personalId].push(documentHash);
        observationIdToObservation[observationId] = documentHash;
        encounterIdToObservation[encounterId].push(documentHash);
    }

    //Get Observation by observationId
    function getObservationByObservationId(string memory observationId)
        public
        view
        returns (bytes32)
    {
        return observationIdToObservation[observationId];
    }


    //Get Observation by encounterId
    function getObservationByEncounterId(string memory encounterId)
        public
        view
        returns (bytes32[] memory)
    {
        return encounterIdToObservation[encounterId];
    }
}
