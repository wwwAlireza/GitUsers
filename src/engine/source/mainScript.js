/**********
    coded by alireza mohammadi ;
    github: github.com/wwwAlireza ;
    codepen: codepen.io/alireza82 ;
    linkedin: linkedin.com/in/wwwAlireza ;
    email: alireza.mhm02@gmail.com ;
**********/
// DOM
function selectById(id) {
    return document.getElementById(id);
}
const inputUsername = selectById("input-username");
const getBtn = selectById("get-btn");
const loadingElement = selectById("loading");

const popupElement = {
    _popup: selectById("popup-container"),
    _close: selectById("popup-close"),
    _header: selectById("popup-header-title"),
    _noResult: selectById("popup-no-result"),
    _followers: selectById("popup-followers-container"),
    _following: selectById("popup-following-container"),
    _repositories: selectById("popup-repositories-container"),
    _starred: selectById("popup-starred-container"),
}
const statistics = {
    _followers: selectById("up-statistics-followers"),
    _following: selectById("up-statistics-following"),
    _repositories: selectById("up-statistics-repositories"),
    _starred: selectById("center-statistics-starred"),
    _public: selectById("center-statistics-public"),
}
const loading = {
    start: () => {
        loadingElement.classList.remove("d-none");
    },
    stop: () => {
        loadingElement.classList.add("d-none");
    }
}
const profile = {
    _avatar: selectById("profile-avatar"),
    _bio: selectById("profile-bio"),
    _username: selectById("profile-username"),
    _name: selectById("profile-name"),
    _blog: selectById("profile-blog"),
    _email: selectById("profile-email"),
    _company: selectById("profile-company"),
    _nodeid: selectById("profile-nodeid"),
    _type: selectById("profile-type"),
    _id: selectById("profile-id"),
    _location: selectById("profile-location"),
    _hireable: selectById("profile-hireable"),
    _twitter: selectById("profile-twitter"),
    _followers: selectById("profile-followers"),
    _following: selectById("profile-following"),
    _repositories: selectById("profile-repositories"),
    _starred: selectById("profile-starred"),
    _public: selectById("profile-public"),
    _join: selectById("profile-join"),
    _update: selectById("profile-update"),
    _description: selectById("profile-description"),
    _usernameLink: selectById("profile-username-link"),
    _blogLink: selectById("profile-blog-link"),
    _twitterLink: selectById("profile-twitter-link"),
    _downloadAvatar: selectById("download-avatar"),
}

var followingCount, followersCount, repositoriesCount, starredCount;
const checkHttp = new RegExp(/http:\/\//g);
const checkHttps = new RegExp(/https:\/\//g);

// ajax
function newRequest(url, then) {
    loading.start();
    var xhttp = new XMLHttpRequest();
    if (!window.XMLHttpRequest) {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP")
    }
    xhttp.open("GET", url, true);
    xhttp.send();

    xhttp.addEventListener("readystatechange", () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            loading.stop();
            then(xhttp.responseText);
        }
        if (xhttp.readyState == 4 && xhttp.status == 403) {
            loading.stop();
            wowAlert.danger({
                text: "Forbidden (403)",
                openMode: "fadeInDown",
                closeMode: "fade",
                autoClose: true,
                closeTime: 3000
            })
        }
        if (xhttp.readyState == 4 && xhttp.status == 404) {
            loading.stop();
            wowAlert.danger({
                text: "Username Not Found (404)",
                openMode: "fadeInDown",
                closeMode: "fade",
                autoClose: true,
                closeTime: 3000
            })
        }
    })
    xhttp.addEventListener("error", () => {
        loading.stop();
        if (!navigator.onLine) {
            wowAlert.danger({
                text: "Internet Is Not Connected",
                openMode: "fadeInDown",
                closeMode: "fade",
                autoClose: true,
                closeTime: 3000
            })
        } else {
            wowAlert.danger({
                text: `Unknown Error (${xhttp.status})`,
                openMode: "fadeInDown",
                closeMode: "fade",
                autoClose: true,
                closeTime: 3000
            })
        }
    })
    xhttp.addEventListener("load", () => {
        loading.stop();
    })
}

// user input
function getUserInformation(username) {
    let requestUrl = `https://api.github.com/users/${username}`;
    newRequest(requestUrl, setUserInformation);
}

function setUserInformation(response) {
    let userInformation = JSON.parse(response);
    newRequest(`https://api.github.com/users/${userInformation.login}/followers`, getFollowers);
    newRequest(`https://api.github.com/users/${userInformation.login}/following`, getFollowing);
    newRequest(`https://api.github.com/users/${userInformation.login}/repos`, getRepositories);
    newRequest(`https://api.github.com/users/${userInformation.login}/starred`, getStarred);
    profile._avatar.src = userInformation.avatar_url;
    profile._downloadAvatar.href = userInformation.avatar_url;
    profile._bio.innerText = userInformation.bio || "{ No bio }";
    profile._blog.innerText = userInformation.blog || "None";
    profile._company.innerText = userInformation.company || "None";
    profile._join.innerText = userInformation.created_at || "None";
    profile._update.innerText = userInformation.updated_at || "None";
    profile._email.innerText = userInformation.email || "None";
    profile._followers.innerText = userInformation.followers || "0";
    profile._following.innerText = userInformation.following || "0";
    profile._username.innerText = userInformation.login || "None";
    profile._name.innerText = userInformation.name || "None";
    profile._nodeid.innerText = userInformation.node_id || "None";
    profile._repositories.innerText = userInformation.public_repos || "0";
    profile._public.innerText = userInformation.public_repos || "0";
    profile._type.innerText = userInformation.type || "None";
    profile._hireable.innerText = userInformation.hireable || "None";
    profile._location.innerText = userInformation.location || "None";
    profile._starred.innerText = "Undefined" || "None";
    profile._id.innerText = userInformation.id || "None"
    profile._usernameLink.href = `https://github.com/${userInformation.login}`;
    if (userInformation.blog != null) {
        profile._blogLink.href = userInformation.blog;
        if (checkHttp.exec(userInformation.blog) == null && checkHttps.exec(userInformation.blog) == null) {
            profile._blogLink.href = `http://${userInformation.blog}`;
        }
        profile._blogLink.target = "_blank";
    } else {
        profile._blogLink.removeAttribute("href");
    }
    profile._twitter.innerText = "None";
    if (userInformation.twitter_username != null) {
        profile._twitterLink.href = `https://twitter.com/${userInformation.twitter_username}`;
        profile._twitter.innerText = `@${userInformation.twitter_username}`;
        profile._twitterLink.target = "_blank";
    } else {
        profile._twitterLink.removeAttribute("href");
    }
    if (userInformation.login == "wwwAlireza") {
        profile._bio.innerHTML += `
        { GitUsers Developer <div class="tick-icon" style="width: 18px;display: inline-block"></div> }`
        setAfterIcons();
    }

    let pageOwner = userInformation.name || "{Not specified}";
    let ownerEmail = userInformation.email || "{Not specified}";
    let ownerBlog = userInformation.blog || "{Not specified}";
    let ownerCompany, ownerLocation, ownerTwitter;
    if (userInformation.company) {
        ownerCompany = `, Works at <b>${userInformation.company}</b> company`;
    } else {
        ownerCompany = "";
    }
    if (userInformation.location) {
        ownerLocation = `, this person lives in ${userInformation.location}`;
    } else {
        ownerLocation = "";
    }
    if (userInformation.twitter_username) {
        ownerTwitter = `, Their twitter account ID is @${userInformation.twitter_username}`
    } else {
        ownerTwitter = "";
    }
    var description = `
    This <a href="https://github.com" target="_blank">GitHub</a> page started it's work since ${userInformation.created_at} with a username of <a href="https://github.com/${userInformation.login}" target="_blank">${userInformation.login}</a>, has ${userInformation.followers} Followers at the moment, and is following ${userInformation.following} people, this page contains ${userInformation.public_repos}
    Repositories. it was updated at ${userInformation.updated_at}. The owner of this account is <b>${pageOwner}</b> Available contact informations for the owner of this page are ( Email address : ${ownerEmail} / blog : ${ownerBlog} ). ${ownerCompany} ${ownerLocation} ${ownerTwitter}
`
    profile._description.innerHTML = description;
}

getBtn.addEventListener("click", checkInput);
inputUsername.onkeypress = function(e) {
    if (e.charCode == 13 || e.keyCode == 13 || e.code == "Enter" || e.key == "Enter") {
        checkInput();
    }
    if (e.charCode == 32 || e.keyCode == 32 || e.code == "Space" || e.key == " ") {
        e.preventDefault();
        inputUsername.value += "-"
    }
}

function checkInput() {
    let usernameInput = inputUsername.value;
    if (usernameInput != "" && usernameInput.length <= 20) {
        getUserInformation(usernameInput);
    }
}
// popup
const popup = {
    open: () => {
        popupElement._popup.classList.remove("d-none");
        popupElement._popup.classList.add("openPopUp");
    },
    close: () => {
        popupElement._popup.classList.remove("openPopUp");
        popupElement._popup.classList.add("d-none");
    }
}

function disableAllStatistics() {
    popupElement._followers.classList.add("d-none")
    popupElement._following.classList.add("d-none");
    popupElement._repositories.classList.add("d-none");
    popupElement._starred.classList.add("d-none");
}
statistics._followers.addEventListener("click", () => {
    popup.open();
    disableAllStatistics();
    popupElement._followers.classList.remove("d-none");
    popupElement._header.innerText = "Followers";
    checkNoResult("followers")
})
statistics._following.addEventListener("click", () => {
    popup.open();
    disableAllStatistics();
    popupElement._following.classList.remove("d-none");
    popupElement._header.innerText = "Following";
    checkNoResult("following")
})
statistics._repositories.addEventListener("click", () => {
    popup.open();
    disableAllStatistics();
    popupElement._repositories.classList.remove("d-none");
    popupElement._header.innerText = "Repositories";
    checkNoResult("repositories")
})
statistics._starred.addEventListener("click", () => {
    popup.open();
    disableAllStatistics();
    popupElement._starred.classList.remove("d-none");
    popupElement._header.innerText = "Starred Repos";
    checkNoResult("starred")
})
statistics._public.addEventListener("click", () => {
    popup.open();
    disableAllStatistics();
    popupElement._repositories.classList.remove("d-none");
    popupElement._header.innerText = "Repositories";
    checkNoResult("repositories")
})
popupElement._close.addEventListener("click", () => {
    popup.close();
    popupElement._header.innerText = "--";
    disableAllStatistics();
    checkNoResult("none")
})

// get following
function getFollowing(response) {
    let following = JSON.parse(response);
    popupElement._following.innerHTML = "";
    followingCount = 0;
    for (let i = 0; i < following.length; i++) {
        followingCount++;
        popupElement._following.innerHTML += `<div class="popup-followers-item" onclick="getUserFromStatistics('${following[i].login}')">
        <div class="popup-followers-item-avatar">
            <img draggable="false" src="${following[i].avatar_url}" alt="">
        </div>
        <div class="popup-followers-item-info">
            <span>${following[i].login}</span>
            <span style="font-size: .8rem;">${following[i].id}</span>
        </div>
    </div>`
    }
    if (followingCount == 1) {
        popupElement._following.classList.remove("justify-content-around");
        popupElement._following.classList.add("justify-content-start");
    } else {
        popupElement._following.classList.add("justify-content-around");
        popupElement._following.classList.remove("justify-content-center");
        popupElement._noResult.classList.add("d-none")
    }
}

// get followers
function getFollowers(response) {
    let followers = JSON.parse(response);
    popupElement._followers.innerHTML = "";
    followersCount = 0;
    for (let i = 0; i < followers.length; i++) {
        followersCount++;
        popupElement._followers.innerHTML += `<div class="popup-followers-item" onclick="getUserFromStatistics('${followers[i].login}')">
        <div class="popup-followers-item-avatar">
            <img draggable="false" src="${followers[i].avatar_url}" alt="">
        </div>
        <div class="popup-followers-item-info">
            <span>${followers[i].login}</span>
            <span style="font-size: .8rem;">${followers[i].id}</span>
        </div>
    </div>`
    }
    if (followersCount == 1) {
        popupElement._followers.classList.remove("justify-content-around");
        popupElement._followers.classList.add("justify-content-start");
    } else {
        popupElement._followers.classList.add("justify-content-around");
        popupElement._followers.classList.remove("justify-content-center");
        popupElement._noResult.classList.add("d-none")
    }
}

function getRepositories(response) {
    let repositories = JSON.parse(response);
    popupElement._repositories.innerHTML = "";
    repositoriesCount = 0;
    for (let i = 0; i < repositories.length; i++) {
        repositoriesCount++;
        popupElement._repositories.innerHTML += `<div class="popup-repositories-item">
        <div class="popup-repositories-up">
            <span class="popup-repositoris-title">
                <a href="https://github.com/${repositories[i].full_name}" target="_blank">${repositories[i].name}</a>
            </span>
            <span class="popup-repositories-description">${repositories[i].description}</span>
        </div>
        <div class="popup-repositories-down">
            <div class="popup-repositories-down-statistics" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-offset="0,7" title="Language">
                <div class="language-icon icon"></div>
                <span>${repositories[i].language}</span>
            </div>
            <div class="popup-repositories-down-statistics" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-offset="0,7" title="Stars">
                <div class="star-icon icon"></div>
                <span class="mt-1">${repositories[i].stargazers_count}</span>
            </div>
            <div class="popup-repositories-down-statistics" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-offset="0,7" title="Forks">
                <div class="fork-icon icon"></div>
                <span>${repositories[i].forks_count}</span>
            </div>
        </div>
    </div>`
    }
    setAfterIcons();
    setBootstrapSetting()
    if (repositoriesCount == 1) {
        popupElement._repositories.classList.remove("justify-content-around");
        popupElement._repositories.classList.add("justify-content-start");
    } else {
        popupElement._repositories.classList.add("justify-content-around");
        popupElement._repositories.classList.remove("justify-content-center");
        popupElement._noResult.classList.add("d-none")
    }
}

function getStarred(response) {
    starred = JSON.parse(response);
    popupElement._starred.innerHTML = "";
    let starredCount = 0;
    for (let i = 0; i < starred.length; i++) {
        starredCount++;
        popupElement._starred.innerHTML += `<div class="popup-repositories-item">
        <div class="popup-repositories-up">
            <span class="popup-repositoris-title">
                <a href="https://github.com/${starred[i].full_name}" target="_blank">${starred[i].name}</a>
            </span>
            <span class="popup-repositories-description">${starred[i].description}</span>
        </div>
        <div class="popup-repositories-down">
            <div class="popup-repositories-down-statistics" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-offset="0,7" title="Language">
                <div class="language-icon icon"></div>
                <span>${starred[i].language}</span>
            </div>
            <div class="popup-repositories-down-statistics" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-offset="0,7" title="Stars">
                <div class="star-icon icon"></div>
                <span class="mt-1">${starred[i].stargazers_count}</span>
            </div>
            <div class="popup-repositories-down-statistics" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-offset="0,7" title="Forks">
                <div class="fork-icon icon"></div>
                <span>${starred[i].forks_count}</span>
            </div>
        </div>
    </div>`
    }
    setAfterIcons();
    setBootstrapSetting()
    profile._starred.innerText = starredCount;
    if (starredCount == 0) {
        profile._starred.innerText = 0;
    } else if (starredCount == 1) {
        popupElement._starred.classList.remove("justify-content-around");
        popupElement._starred.classList.add("justify-content-start");
    } else {
        popupElement._starred.classList.add("justify-content-around");
        popupElement._starred.classList.remove("justify-content-center");
        popupElement._noResult.classList.add("d-none")
    }
}

function getUserFromStatistics(username) {
    popup.close();
    getUserInformation(username);
    inputUsername.value = username;
}

function checkNoResult(section) {
    switch (section) {
        case "followers":
            {
                if (!followersCount) {
                    popupElement._noResult.classList.remove("d-none");
                } else {
                    popupElement._noResult.classList.add("d-none");
                }
            }
            break;
        case "following":
            {
                if (followingCount == 0) {
                    popupElement._noResult.classList.remove("d-none");
                } else {
                    popupElement._noResult.classList.add("d-none");
                }
            }
            break;
        case "repositories":
            {
                if (repositoriesCount == 0) {
                    popupElement._noResult.classList.remove("d-none");
                } else {
                    popupElement._noResult.classList.add("d-none");
                }
            }
            break;
        case "starred":
            {
                if (starredCount == 0) {
                    popupElement._noResult.classList.remove("d-none");
                } else {
                    popupElement._noResult.classList.add("d-none");
                }
            }
            break;
        default:
            {
                popupElement._noResult.classList.add("d-none");
            }
            break;
    }
}

getUserInformation("wwwAlireza");