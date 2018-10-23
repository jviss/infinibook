pragma solidity 0.4.24;

contract Controller {

    mapping(bytes32 => Genre) public genres;
    
    constructor () public {
        genres["Science Fiction"] = new Genre("Science Fiction");
        genres["Fantasy"] = new Genre("Fantasy");
        genres["Adventure"] = new Genre("Adventure");
        genres["Erotica"] = new Genre("Erotica");
    }
    
    function getGenre(bytes32 name) view returns (Genre) {
        return genres[name];
    }

    function addExcerpt (bytes32 words, bytes32 genre, bytes32 story) public {
        Genre _g = genres[genre];
        Story _s = _g.getStory(story);
        _s.addWords(words);
    }

}
contract Genre {
    
    bytes32 public name;
    
    constructor (bytes32 n) public {
        name = n;
    }

    mapping(bytes32 => Story) public stories;

    function createStory(bytes32 name) {
        stories[name] = new Story(name);
    }

    function getStory(bytes32 name) view returns (Story) {
        return stories[name];
    }
}
contract Story {
    
    bytes32 public name;

    address[] excerpts;

    constructor (bytes32 n) public {
        name = n;
    }
    
    function addWords (bytes32 _words) public {
        address newExcerpt = new Excerpt(_words);
        excerpts.push(newExcerpt);
    }
    
    function getExcerpts() view returns (address[]) {
        return excerpts;
    }
}
contract Excerpt {

    bytes32 public words;

    constructor (bytes32 w) public {
        words = w;
    }

    function getWords() view returns (bytes32) {
        return words;
    }
}
