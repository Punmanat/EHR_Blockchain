contract PatientProfile {
    struct Profile {
        address owner;
        bytes32 _documentHash;
        bool valid;
        uint256 revision;
    }

    mapping(address => Profile) addressToProfile;

    function getProfile(address owner) public view returns (bytes32) {
        if (addressToProfile[owner].valid) {
            return addressToProfile[owner]._documentHash;
        } else {
            return "";
        }
    }

    function setProfile(
        address owner,
        bytes32 _documentHash,
        uint256 revision
    ) public {
        Profile memory patient;
        patient.owner = owner;
        patient._documentHash = _documentHash;
        patient.revision = revision;
        patient.valid = true;
        addressToProfile[owner] = patient;
    }

    function removeProfile(address owner) public {
        addressToProfile[owner].valid = false;
    }

    function getRevision(address owner) public view returns (uint256) {
        return addressToProfile[owner].revision;
    }
}
