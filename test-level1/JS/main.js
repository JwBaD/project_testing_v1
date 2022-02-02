function getElement(selector) {
    return document.querySelector(selector);
}

function hideShowElements(hideElement, showElement) {
    getElement(hideElement).style.display = 'none';
    getElement(showElement).style.display = 'block';
}

// нажимая на кнопку Edit, скрывается нижний placeholder и нижняя секция со стилями и 
// на его месте открывается нижний блок для редактирования текста. туда передается весь текст с верхнего поля
document.getElementById('edit-button').addEventListener('click', function() {
    getElement('.lower-section-placeholder').style.display = 'none';
    getElement('.lower-section-style').style.display = 'none';
    getElement('.lower-section-edit').style.display = 'block';
    const highSectionText = document.querySelector('.content').innerHTML;
    getElement('.lower-section-textarea').value = highSectionText;
});

// нажимая на кнопку Save, скрывается нижний нижний блок для редактирования текста
// на его месте открывается нижний placeholder. одновременно содержимое поля редактирования 
// заменяет текст с верхнего поля
document.getElementById('save-button').addEventListener('click', function() {
    const lowerSectionText = document.querySelector('.lower-section-textarea').value;
    getElement('.content').innerHTML = `${lowerSectionText}`;
});

// нажимая на кнопку Style скрывается нижний блок для редактирования текста и оккрывается нижний блок со стилями
document.getElementById('style-button').addEventListener('click', function() {
    getElement('.lower-section-placeholder').style.display = 'none';
    getElement('.lower-section-edit').style.display = 'none';
    getElement('.lower-section-style').style.display = 'block';
});

// нажимая на радиобаттоны в секции стиля, мы меняем размер текста в pt(12,14,16,18,20)
document.getElementById('radio1').addEventListener('click', function() {
    getElement('.content').style.fontSize = '12pt';
});

document.getElementById('radio2').addEventListener('click', function() {
    getElement('.content').style.fontSize = '14pt';
});

document.getElementById('radio3').addEventListener('click', function() {
    getElement('.content').style.fontSize = '16pt';
});

document.getElementById('radio4').addEventListener('click', function() {
    getElement('.content').style.fontSize = '18pt';
});

document.getElementById('radio5').addEventListener('click', function() {
    getElement('.content').style.fontSize = '20pt';
});


// нажимая на разные шрифты, в разделе content меняется шрифт текста
document.getElementById('font-selector').addEventListener('change', function(){
    getElement('.content').style.fontFamily = this.value;
});

// поставив галочку в пункте bold вес текста в разделе content меняется на bold и наоборот
getElement('.bold-text').addEventListener('click', function() {
    if(this.checked) {
        getElement('.content').style.fontWeight = 'bold';
    } else {
        getElement('.content').style.fontWeight = 'normal';
    }
});

// поставив галочку в пункте italic стиль текста в разделе content меняется на italic и наоборот
getElement('.italic-text').addEventListener('click', function() {
    if(this.checked) {
        getElement('.content').style.fontStyle = 'italic';
    } else {
        getElement('.content').style.fontStyle = 'normal';
    }
});


// нажимая на кнопку color выпадает меню выбора цвета text-color раздела content
document.getElementById('Color-button').addEventListener('click', function() {
    getElement('.text-color-block').style.display = 'block';
});

for (let i = 0; i < document.querySelectorAll('.all-color').length; i++) {
    document.querySelectorAll('.all-color')[i].addEventListener('click', function() {
        if (getElement('.content').classList.length > 1) {
            getElement('.content').classList.remove(getElement('.content').classList[1]);
        }
        getElement('.content').classList.add(`text-color${i+1}`);
    });
}

// нажимая на кнопку bgcolor выпадает меню выбора цвета background раздела content
document.getElementById('BgColor-button').addEventListener('click', function() {
    getElement('.background-color-block').style.display = 'block';
});

for (let i = 0; i < document.querySelectorAll('.all-bgColor').length; i++) {
    document.querySelectorAll('.all-bgColor')[i].addEventListener('click', function() {
        if (getElement('.content').classList.length > 1) {
            getElement('.content').classList.remove(getElement('.content').classList[1]);
        }
        getElement('.content').classList.add(this.classList[1]);
    });
}


function hideColorPopup(event, selector) {
    if (event.target.closest(selector) === null) {
        document.querySelector(selector).style.display = 'none';
    }
}

document.addEventListener('mousedown', function(e) {
    hideColorPopup(e, '.text-color-block');
    hideColorPopup(e, '.background-color-block');
});

// нажимая на кнопку add появляется section-add-button, всё остальное скрывается
document.getElementById('add-button').addEventListener('click', function() {
    hideShowElements('.editor-content', '.section-add-button');
});

// нажимая на кнопку back, section-add-button скрывается и открывается первоначальное меню
document.getElementById('back-button').addEventListener('click', function() {
    hideShowElements('.section-add-button', '.editor-content');
});

// нажимая на радиобаттоны в секции add, мы меняем меню с table на list
document.getElementById('list').addEventListener('click', function() {
    hideShowElements('.table-configuration-container', '.list-configuration-container');
});

// нажимая на радиобаттоны в секции add, мы меняем меню с list на table
document.getElementById('table').addEventListener('click', function() {
    // getElement('.list-configuration-container').style.display = 'none';
    // getElement('.table-configuration-container').style.display = 'block';
    hideShowElements('.list-configuration-container', '.table-configuration-container');
});

// скрипт создания таблицы
document.getElementById('create-button').addEventListener('click', function() {
    const rows = document.getElementById('row').value;
    const cells = document.getElementById('cell').value;
    const widthOfCell = document.getElementById('width-of-cell').value;
    const heightOfCell = document.getElementById('height-of-cell').value;
    const borderWidth = document.getElementById('border-width').value;
    const borderColor = document.getElementById('border-color-selector').value;
    const borderType = document.getElementById('border-type-selector').value;
    const lists = document.getElementById('count-of-list').value;
    const typeOfMark = document.getElementById('type-of-mark-selector').value;
    let lowSectionTextEdit = getElement('.lower-section-textarea');

    if (document.getElementById('table').checked) {
        let tableResult = `<table border="${borderWidth}"; bordercolor="${borderColor}";><style>table { border-style: ${borderType}; }</style>`;

        for(let i = 1; i <= rows; i++) {
            tableResult += '<tr>';
            for(let u = 1; u <= cells; u++) {
                tableResult += `<td style="width:${widthOfCell}px; height:${heightOfCell}px"></td>`;
            }
            tableResult += '</tr>';
        }
        tableResult += '</table>';
        lowSectionTextEdit.value += tableResult;
    } else {
        let listResult = `<ul type="${typeOfMark}">`;
        for (let i = 1; i <= lists; i++) {
            listResult += '<li>Текст</li>';
        }
        listResult += '<ul></ul>';
        lowSectionTextEdit.value += listResult;
    }
    
    hideShowElements('.section-add-button', '.editor-content');
});

