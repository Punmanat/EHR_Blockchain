contract Hello{
    string word;
    function sayHello() public view 
    returns(string memory){
        return word;
    }
    function setWord(string memory _word) public{
        word = _word;
    } 
}