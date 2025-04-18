local githubRepo = {
    name = "hLdY-8s-N-kw",
    owner = "officialODBIT",
    description = "The official github resp. for odbit.org",
    language = "Lua",
    visibility = "public",
    
     A list of branches in the repository
    branches = {
        "main",
    },
    files = {
        ["index.lua"] = "executes main odbit.org home page",
        ["README.md"] = "reame file for info",
        ["LICENSE"] = "MIT License",
    },
    contributors = {
        { name = "officialODBIT", contributions = 101 },
    },
    printInfo = function()
        print("Repository Name: " .. githubRepo.name)
        print("Owner: " .. githubRepo.owner)
        print("Description: " .. githubRepo.description)
        print("Language: " .. githubRepo.language)
        print("Visibility: " .. githubRepo.visibility)
    end
}
githubRepo.printInfo()
print("Files in repository:")
for filename, content in pairs(githubRepo.files) do
    print(filename .. ": " .. content)
end

print("Branches in the repository:")
for _, branch in ipairs(githubRepo.branches) do
    print(branch)
end
