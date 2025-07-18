(function () {
    "use strict";

    const root = document.documentElement;
    const navToggle = document.querySelector("#js-navToggle");
    const eventPP = document.querySelector("#js-eventPP");
    const swipers = document.querySelectorAll(".js-swiper");

    navToggle.addEventListener("click", function () {
        root.classList.toggle("show-nav");
    });

    if (eventPP) {
        const eventOpenBtn = document.querySelector("#js-eventOpenBtn");
        const closeEventPP = function (event) {
            function close() {
                document.removeEventListener("keyup", closeEventPP);
                eventPP.removeEventListener("click", closeEventPP);
                root.classList.remove("show-event-popup");
            }

            switch (event.type) {
                case "keyup":
                    if (event.key === "Escape" || event.keyCode === 27) close();
                    break;
                case "click":
                    if (
                        event.target === this ||
                        event.target.classList.contains("js-ppCloseBtn")
                    )
                        close();
                    break;
            }
        };
        eventOpenBtn.addEventListener("click", function () {
            root.classList.add("show-event-popup");
            document.addEventListener("keyup", closeEventPP);
            eventPP.addEventListener("click", closeEventPP);
        });
    }

    swipers.forEach(function (swpr) {
        new Swiper(swpr, {
            updateOnWindowResize: true,
            slidesPerView: "auto",
            freeMode: true,
            spaceBetween: 0,
            speed: 500,
            grabCursor: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-arrow-next",
                prevEl: ".swiper-arrow-prev",
                disabledClass: "arrow--disabled",
            },
        });
    });

    let mapStylesArr = [
        {
            elementType: "geometry",
            stylers: [{color: "#242f3e"}],
        },
        {
            elementType: "labels.text.fill",
            stylers: [{color: "#746855"}],
        },
        {
            elementType: "labels.text.stroke",
            stylers: [{color: "#242f3e"}],
        },
        {
            featureType: "administrative",
            elementType: "geometry",
            stylers: [{visibility: "off"}],
        },
        {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{color: "#d59563"}],
        },
        {
            featureType: "poi",
            stylers: [{visibility: "off"}],
        },
        {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{color: "#d59563"}],
        },
        {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{color: "#263c3f"}],
        },
        {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{color: "#6b9a76"}],
        },
        {
            featureType: "road",
            elementType: "geometry",
            stylers: [{color: "#38414e"}],
        },
        {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{color: "#212a37"}],
        },
        {
            featureType: "road",
            elementType: "labels.icon",
            stylers: [{visibility: "off"}],
        },
        {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{color: "#9ca5b3"}],
        },
        {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{color: "#746855"}],
        },
        {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{color: "#1f2835"}],
        },
        {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{color: "#f3d19c"}],
        },
        {
            featureType: "transit",
            stylers: [{visibility: "off"}],
        },
        {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{color: "#2f3948"}],
        },
        {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [{color: "#d59563"}],
        },
        {
            featureType: "water",
            elementType: "geometry",
            stylers: [{color: "#17263c"}],
        },
        {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{color: "#515c6d"}],
        },
        {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{color: "#17263c"}],
        },
    ];

    const contactsMap = document.querySelector("#js-contactsMap");
    if (contactsMap) {
        const map = new google.maps.Map(contactsMap, {
            center: { lat: 56.49387, lng: 84.96274 },
            zoom: 15,
            styles: mapStylesArr,
            disableDefaultUI: true,
            gestureHandling: "cooperative",
            scrollwheel: false,
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_BOTTOM,
            }
        });

        const pinElement = document.createElement("img");
        pinElement.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAABHCAMAAABf/MtLAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAACxMAAAsTAQCanBgAAADAUExURUdwTK8wILwyJL0zI70yJbwyI79AIL0yJL8wILs0JLw0JLsyJL0zJbwyJbwzJB8eHv///3Nycjs6OldWVsRMP4+OjsRNP8fHx+Pj492ZkUlISOazrauqqu7MyMfGxsBAMS0sLMlZTc1mW/vy8sBAMvvy8WVkZMVMQPbl48lZTtmMg81mWtmMhMxmW4+Pj/fm4/fl5OGmnvHx8Z2cnMVNQPLZ1tWAdt6ZktBzaHNzc9V/duq/u+Gmn8hZTNFzabm5uYZR+N4AAAAOdFJOUwAQz9/f3xB/EIDPz9/ftWbT5QAAAWxJREFUWMPt1VlTwjAQAGDEaluPJiQhYGjtAeUQxPu+/v+/cpO2DC+OI7PRYcx+JOlO55vMdpO2WmtBNo3W9+FsZzvb2c529l/Y45hXi/iG6yA8fuKMkGUMqS5X1RvLONvA7tJOtaD9au5AginSo5A6hUem3+hRhmUTwhubjNFttbKzDwT7GqqtGpv0G5vE2Ptes9FrsvqW/9FmXDGIjHCuZwYJc0wUHCn9aYlJKO7uKmf/sh39LJxtxx7lObJ9e1emMA1oISN5OUmFmNMrIQSGnd/TM2M/w3iRwCDpCdK+i9EwMfY5jMkU056l0SvNtf0GT0PUfT9K+a6tAYUKP0wFpl3oSpTansuXchIh2jM9LKDWet/SlATNLkxjg2lqsjAtg9cnOqCbU1Ev9Ji6+wTTdv/LLbJdbHnsh140GwZW6ANz+Ns28LC+WXwL9lFt71mwv7gSUcKzuG/fYr2DtqEPd2w0YeAfR55vg/4EpN3f8dlAXnoAAAAASUVORK5CYII=";
        pinElement.width = 91;
        pinElement.height = 71;
        pinElement.style.transform = "translate(0px, -71px)"; // Смещение для точки привязки

        new google.maps.marker.AdvancedMarkerElement({
            position: { lat: 56.49385, lng: 84.96274 },
            map: map,
            title: "TAGREE digital",
            content: pinElement
        });
    }

    const jsSelectric = $(".js-selectric");
    if (jsSelectric.length) {
        jsSelectric.selectric({
            nativeOnMobile: false,
        });
    }

    const mobileMask = $(".js-mobileMask");
    if (mobileMask.length) {
        mobileMask.mask("+7 (000) 000 00 00", {
            placeholder: "+7 (___) ___ __ __",
        });
    }

    const dateField = $(".js-dateField");
    if (dateField.length) {
        const pickerInit = function (pick) {
            const dateInput = pick.find(".js-dateInput");
            const dateDay = pick.find(".js-dateDay");
            const dateMonth = pick.find(".js-dateMonth");
            const dateYear = pick.find(".js-dateYear");
            const dateConfig = {
                autoClose: true,
                minDate: new Date(),
                navTitles: {
                    days: "MMMM <i>yyyy</i>",
                },
                onSelect: function ({date}) {
                    dateDay.val(date ? ("0" + date.getDate()).slice(-2) : "");
                    dateMonth.val(date ? ("0" + (date.getMonth() + 1)).slice(-2) : "");
                    dateYear.val(date ? date.getFullYear() : "");
                },
            };
            new AirDatepicker(dateInput[0], dateConfig);
        };
        $.each(dateField, function (i) {
            pickerInit($(this));
        });
    }
})();

function detectBrowser() {
    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.indexOf("firefox") > -1) {
        return "Firefox";
    } else if (userAgent.indexOf("chrome") > -1) {
        return "Chrome";
    } else if (userAgent.indexOf("safari") > -1) {
        return "Safari";
    } else if (userAgent.indexOf("opera") > -1 || userAgent.indexOf("opr") > -1) {
        return "Opera";
    } else if (
        userAgent.indexOf("msie") > -1 ||
        userAgent.indexOf("trident") > -1
    ) {
        return "Internet Explorer";
    } else {
        return "Unknown";
    }
}

document.body.classList.add(detectBrowser());

let btn = document.querySelector('[data-pp]');
let btnClose = document.querySelector('[data-pp-close]');
if (btn) {
    btn.addEventListener('click', openModal);
}
if (btnClose) btnClose.addEventListener('click', closeModal);