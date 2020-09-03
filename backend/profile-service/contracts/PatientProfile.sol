contract PatientProfile {

    struct Profile {
        string personalId;
        address owner;
        bytes32 _documentHash;
        bool valid;
        uint256 revision;
        string[] whitelist;
    }

    mapping(address => Profile) addressToProfile;
    mapping(string => Profile) personalIdToProfile;

    function getProfileById(string memory personalId) public view returns (bytes32) {
        if (personalIdToProfile[personalId].valid) {
            return personalIdToProfile[personalId]._documentHash;
        } else {
            return "";
        }
    }
    function getProfile(address owner) public view returns (bytes32) {
        if (addressToProfile[owner].valid) {
            return addressToProfile[owner]._documentHash;
        } else {
            return "";
        }
    }

    function setProfile(
        string memory personalId,
        address owner,
        bytes32 _documentHash,
        uint256 revision
    ) public {
        Profile memory patient;
        patient.personalId = personalId;
        patient.owner = owner;
        patient._documentHash = _documentHash;
        patient.revision = revision;
        patient.valid = true;
        addressToProfile[owner] = patient;
        personalIdToProfile[personalId] = patient;
    }
    function setWhiteList(
        address owner,
        string memory id
    ) public {
        addressToProfile[owner].whitelist.push(id);
        personalIdToProfile[addressToProfile[owner].personalId].whitelist.push(id);
    }

    function checkWhiteList(
        string memory personalId,
        string memory id
    ) public view returns (bool){
        for(uint i = 0; i < personalIdToProfile[personalId].whitelist.length; i++){
            if(keccak256(abi.encodePacked((personalIdToProfile[personalId].whitelist[i]))) == keccak256(abi.encodePacked((id)))){
                return true;
            }
        }
        return false;
    }

    function removeProfile(address owner) public {
        addressToProfile[owner].valid = false;
        personalIdToProfile[addressToProfile[owner].personalId].valid = false;
    }

    function getRevision(address owner) public view returns (uint256) {
        return addressToProfile[owner].revision;
    }
    function checkValid(address owner) public view returns (bool){
        return addressToProfile[owner].valid;
    }
    function checkValidByPersonalId(string memory personalId) public view returns (bool){
        return personalIdToProfile[personalId].valid;
    }
}
