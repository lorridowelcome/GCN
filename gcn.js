const url = "https://www.globalcyclingnetwork.com/api/devtask";

//this worked only if a browser plugin for CORS was active
async function fetchVidsFromWebJson() {
    const response = await fetch(url);
    const vids = await response.json();
    console.log(vids);
}

//I was getting CORS policy error from your devtask url so i decided to use fetch on the local json file
function fetchVidsFromLocalJson() {
    fetch("/devtask.json")
        .then(res => res.json())
        .then(data => {
            console.log(data);

            data.forEach(element => {
                var id = element._id;
                var title = element.title;
                var publishDate = new Date(element.publishDate);
                var d = document.createElement('div');
                d.innerHTML = `
                <div class="position-relative border-radius-xl overflow-hidden shadow-lg mb-7 ">
                    <div class="container border-bottom ">
                        <div class="row py-3 ">
                            <p class="text-dark pt-1 mb-0">${publishDate.toLocaleDateString()}</p>
                            <div class="col-lg-4 text-start ">
                                <p class="lead text-dark pt-1 mb-0 ">${title}</p>
                            </div>
                            <div class="col-lg-4 mt-1 text-center ">
                            </div>
                            <div class="col-lg-4 text-end my-auto ">
                                <a href="#" class="text-primary icon-move-right ">Watch
                                    <i class="fas fa-arrow-right text-sm ms-1 " aria-hidden="true "></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div>
                        <a href="https://google.it">
                            <img class="w-100 " src="https://img.youtube.com/vi/${id}/mqdefault.jpg" alt="header-2 ">
                        </a>
                    </div>
                </div>
                `;
                document.getElementById("gcn").appendChild(d);
            });
        })
}

function searchVids() {

    fetch("/devtask.json")
        .then(res => res.json())
        .then(data => {
            console.log(data);

            var toSearch = document.getElementById('search').value;
            var result = search(toSearch, data);
            console.log(result);

            var node = document.getElementById('gcn');
            while (node.hasChildNodes()) {
                node.removeChild(node.firstChild);
            }

            result.forEach(element => {
                var id = element._id;
                var title = element.title;
                var publishDate = new Date(element.publishDate);
                var d = document.createElement('div');
                d.innerHTML = `
                <div class="position-relative border-radius-xl overflow-hidden shadow-lg mb-7 ">
                    <div class="container border-bottom ">
                        <div class="row py-3 ">
                            <p class="text-dark pt-1 mb-0">${publishDate.toLocaleDateString()}</p>
                            <div class="col-lg-4 text-start ">
                                <p class="lead text-dark pt-1 mb-0 ">${title}</p>
                            </div>
                            <div class="col-lg-4 mt-1 text-center ">
                            </div>
                            <div class="col-lg-4 text-end my-auto ">
                                <a href="#" class="text-primary icon-move-right ">Watch
                                    <i class="fas fa-arrow-right text-sm ms-1 " aria-hidden="true "></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div>
                        <a href="https://google.it">
                            <img class="w-100 " src="https://img.youtube.com/vi/${id}/mqdefault.jpg" alt="header-2 ">
                        </a>
                    </div>
                </div>
                `;
                document.getElementById("gcn").appendChild(d);
            });
        })

}

function search(nameKey, myArray) {
    var newArray = [];
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].title.toLowerCase().includes(nameKey) || myArray[i].title.includes(nameKey)) {
            newArray.push(myArray[i])
        }
    }
    return newArray;
}


function navBarDisappearOnScroll() {
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("navbar").style.top = "0";
        } else {
            document.getElementById("navbar").style.top = "-95px";
        }
        prevScrollpos = currentScrollPos;
    }
}

document.addEventListener("DOMContentLoaded", function() {

    //fetchVidsFromWebJson();
    fetchVidsFromLocalJson();
    navBarDisappearOnScroll();

});