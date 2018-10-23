pragma solidity 0.4.24;

contract Controller {

    mapping(bytes32 => Genre) public genres;
    
    constructor() public {
        Genre storage sf;
        sf.gName = "Science Fiction";
        genres["Science Fiction"] = sf;
        Genre storage f;
        f.gName = "Fantasy";
        genres["Fantasy"] = f;
        Genre storage a;
        a.gName = "Adventure";
        genres["Adventure"] = a;
        Genre storage e;
        e.gName = "Erotica";
        genres["Erotica"] = e;

    }
    

    function addExcerpt (bytes32 words, bytes32 genre, bytes32 story) public {
        Genre _g = genres[genre];
        Story _s = _g.stories[story];
        _s.excerpts.push(words);
    }

    function getStories(bytes32 gName) public view returns (bytes32[]) {
        return genres[gName].sNames;
    }

    function createStory(bytes32 gName, bytes32 sName)  {
        if(genres[gName].storyNames[sName]) revert("Story name exists");

        genres[gName].sNames.push(sName);

        genres[gName].storyNames[sName] = true;

        Story storage _s;
        _s.sName = sName;
        genres[gName].stories[sName] = _s;
    }

    function getStory(bytes32 gName, bytes32 sName) returns (bytes32,bytes32[]) {
        Story memory s = genres[gName].stories[sName];
        return (s.sName,s.excerpts);
    }

    struct Genre {
        bytes32 gName;
        mapping(bytes32 => Story) stories;
        mapping(bytes32 => bool) storyNames;
        bytes32[] sNames;
    }

    struct Story {
        bytes32 sName;
        bytes32[] excerpts;
    }

}

