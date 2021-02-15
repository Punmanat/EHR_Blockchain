contract AllergyIntoleranceContract {
    struct AllergyIntolerance {
        string personalId;
        string allergyIntoleranceId;
        bytes32 documentHash;
    }

    mapping(string => bytes32[]) personalIdToAllergyIntolerance;
    mapping(string => bytes32) allergyIntoleranceIdToAllergyIntolerance;

    //Set AllergyIntolerance
    function setAllerygyIntolerance(
        string memory personalId,
        string memory allergyIntoleranceId,
        bytes32 documentHash
    ) public {
        AllergyIntolerance memory allergyIntolerance;
        allergyIntolerance.personalId = personalId;
        allergyIntolerance.allergyIntoleranceId = allergyIntoleranceId;
        allergyIntolerance.documentHash = documentHash;
        personalIdToAllergyIntolerance[personalId].push(documentHash);
        allergyIntoleranceIdToAllergyIntolerance[allergyIntoleranceId] = documentHash;
    }

    //Get AllergyIntolerance by AllergyIntoleranceId
    function getAllergyIntoleranceByAllergyIntoleranceId(string memory allergyIntoleranceId)
        public
        view
        returns (bytes32)
    {
        return allergyIntoleranceIdToAllergyIntolerance[allergyIntoleranceId];
    }

    //Get ALL AllergyIntolerance of patient
    function getAllergyIntoleranceByPersonalId(string memory personalId)
        public
        view
        returns (bytes32[] memory)
    {
        return personalIdToAllergyIntolerance[personalId];
    }
}
