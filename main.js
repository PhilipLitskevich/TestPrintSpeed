(() => {
    //Округление
    function rounding(number, floorNumber) {
        return Math.round(number * Math.pow(10, floorNumber)) / Math.pow(10, floorNumber)
    }
    //Вычисление скорости в минуту
    function inputSpeed(startTime, nextPointTime, quantity, floorNumber = 0) {
        const timeInterval = (nextPointTime - startTime) / 1000;
        const speed = quantity * 60 / timeInterval
        return rounding(speed, floorNumber)
    }
    //Преобразование текста
    function textSeparation(text) {
        const textArr = text.split('')
        const newTextArr = []
        for (latter of textArr) {
            newTextArr.push(`<span class="black">${latter}</span>`)
        }
        const newText = newTextArr.join('')
        return newText
    }
    //Рандомная генерация числа
    function randomNumber(num1, num2) {
        const range = Math.abs(num1 - num2);
        const numberInRange = Math.round(Math.random() * range);
        const min = Math.min(num1, num2);
        const randomNumber = min + numberInRange;
        return randomNumber
    }

    function createPrintSpeedTestApp(text) {
        //Преобразование типа текста
        if (typeof (text) === 'string') {text = [text]}

        const speedDisplay = document.querySelector('.speed__display')
        speedDisplay.textContent = '0'

        const accuracyDisplay = document.querySelector('.accuracy__display')
        accuracyDisplay.textContent = '100'

        const textWrapper = document.querySelector('.text-wrapper')
        textWrapper.innerHTML = textSeparation(text[randomNumber(0, text.length - 1)])

        const btnReset = document.querySelector('.btn-reset')

        const popupStart = document.getElementById('popup-start')
        const popupFinish = document.getElementById('popup-finish')
        const popupStartBtn = document.getElementById('btn-start')
        const popupFinishBtn = document.getElementById('btn-finish')

        const body = document.querySelector('body')
        body.style.overflow = 'hidden'

        popupStartBtn.addEventListener('click', () => {
            //Отключение Модального окна
            body.style.overflow = 'auto'
            popupStart.style.display = 'none'
            //Необходимые переменные
            let startTime = false          //стартовое время
            let inputQuantity = 0          //количество введенных символов
            let speedInterval = null;      //Интервал обновления вывода результатов скорости
            let mistakes = 0               //количество ошибок

            document.addEventListener('keypress', keyListener)

            function keyListener(e) {
                e.preventDefault()

                const symbol = textWrapper.querySelector('.black')
                if (e.key === symbol.textContent) {
                    symbol.classList.add('passed-text')
                    symbol.classList.remove('black', 'red')

                    inputQuantity++;
                    if (!startTime) {
                        startTime = new Date();
                    }
                    if (inputQuantity > 1 && typeof (speedInterval) !== 'number') {
                        speedInterval = setInterval(() => {
                            nextPointTime = new Date();
                            speedDisplay.textContent = inputSpeed(startTime, nextPointTime, inputQuantity)
                        }, 1000)
                    }
                }
                else {
                    if (!symbol.classList.contains('red')) {
                        mistakes++
                        //Точность
                        const accuracy = rounding(100 - (100 * mistakes / textWrapper.children.length), 1)
                        accuracyDisplay.textContent = accuracy
                    }
                    symbol.classList.add('red')
                }
                //При завершении теста
                if (inputQuantity === textWrapper.children.length) {
                    clearInterval(speedInterval)

                    popupFinish.style.display = 'flex'
                    document.getElementById('speed').textContent = speedDisplay.textContent
                    document.getElementById('accuracy').textContent = accuracyDisplay.textContent

                    popupFinishBtn.addEventListener('click', reset)
                }
            }

            function reset() {
                clearInterval(speedInterval)
                document.removeEventListener('keypress', keyListener)
                //Работа с модальными окнами
                popupFinish.style.display = 'none'
                body.style.overflow = 'hidden'
                popupStart.style.display = 'flex'
                //Обнуление переменных
                speedInterval = null
                startTime = false
                inputQuantity = 0
                mistakes = 0
                //Обнуление результатов теста
                speedDisplay.textContent = '0'
                accuracyDisplay.textContent = '100'
                //Сброс текста
                textWrapper.innerHTML = textSeparation(text[randomNumber(0, text.length - 1)])
            }
            //активация кнопки рестарта
            btnReset.addEventListener('click', reset)
        })
    }

    //Массив текстов
    const texts = [
        'В деревне было много садов. Осенью поспевали яблоки и груши. В садах было много птиц. Они выводили птенцов и целый день кормили их червяками. Ребята разорили гнезда птиц. Птицы улетели из этой деревни. Весной зацвели на яблонях цветы, но червяки забрались в цветы и поели их. Осенью не было на деревьях яблок и груш. Поняли ребята, что птицы спасали их деревья, но было поздно.',
        'Был у дедушки Степана мёд в горшке. Забрались в горшок муравьи и ели мёд. Дедушка видит, дело плохо. Взял он горшок, привязал веревку и повесил горшок на гвоздь к потолку. А в горшке остался один муравей. Он искал дорогу домой: вылез из горшка на верёвку, потом на потолок. С потолка наа стену, а со стены на пол. Муравей показал дорогу к горшку другим муравьям. Дедушка Степан снял горшок, а там мёду нет.',
        //'Тучу передернуло синим пламенем. Медленно загремел гром. Он то усиливался, то почти затихал. И дождь, подчиняясь грому, начал временами идти сильнее и широко шуметь по листве, потом останавливался. Вскоре сквозь тучи пробилось солнце. Старый пушкинский парк в Михайловском и крутые берега Сороти запылали рыжей глиной и мокрой травой. Стройная радуга зажглась нал пасмурной далью. Она сверкала и дымилась, окруженная космами пепельных туч. Радуга была похожа на арку, воздвигнутую на границе заповедной земли. С особенной силой здесь, в пушкинских местах, возникали мысли о русском языке. Здесь Пушкин бродил с непокрытой головой, со спутанными осенним ветром холодными волосами, слушал влажный гул сосновых вершин, смотрел, прищурившись, откуда несутся осенние тучи, толкался по ярмаркам. Здесь чудесные слова переполняли его, стесняли его душу и, наконец, слагались по огрызком гусиного пера в звенящие строфы.',
        '"Большая пустыня" - так называлась северная часть Африки на средневековых мореходных картах. Название "Сахара" тогда касалась только западной и средней частей территории. Длина барханных цепей в Сахаре может достигать 5 км, а высота - 400 м. В некоторых районах Сахары дождя нужно ждать целые годы или даже десятилетия. Иногда дождь даже не достигает земли, поскольку капли могут испаряться в полете.',
        'Древние люди тоже умели рисовать, и рисовали часто. Вот только бумаги у них не было, поэтому рисовали они на стенах пещер. В пещерах Франции и Испании открыты настоящие картинные галереи каменного века, на которых изображены люди, олени, буйволы, зубры. Древние люди считали, что если носить при себе частицы зверя (например, ожерелье из клыков барса), то приобретаешь его силу, выносливость, бесстрашие.',
        'В 20 веке психологи много занимались изучением странного феномена - каким образом люди начинают верить даже в те утверждения, которые при чуть более глубоком рассмотрении оказываются совершенно абсурдными. Немцы в гитлеровской Германии достаточно часто встречались в жизни с евреями: до начала нацистских преследований численность еврейского населения в стране была огромной.',
        'Под водной толщей некоторых морей скрываются ямы невероятно больших размеров, их называют впадинами. Самой глубокой морской впадиной считают Марианский желоб, расположенный неподалеку от Марианских островов в Тихом океане. В самом глубоком месте расстояние от дна составляет 10994 м. Эту точку называют Бездна Челленджера. Глубина Марианского желоба значительно больше самой высокой горы Джомолунгмы (8848 м).',
        'Большинство древних цивилизаций верили, что Земля является центром вселенной, а Солнце, другие планеты и звезды вращаются вокруг нее. Но в 1543 году ученый и астроном Николай Коперник выяснил, что Земля вращается вокруг Солнца. Чтобы совершить путешествие вокруг Солнца, Земле нужно 356,25 дня. Это время называется годом. Солнце - ближайшая к Земле звезда. Его свет и тепло делает возможной жизнь на планете.',
    ]
    const test = ['Просто текст для теста. Просто текст для теста. Просто текст для теста.']
    const test1 = ['1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1']
    const text1 = ['В 20 веке психологи много занимались изучением странного феномена - каким образом люди начинают верить даже в те утверждения, которые при чуть более глубоком рассмотрении оказываются совершенно абсурдными. Немцы в гитлеровской Германии достаточно часто встречались в жизни с евреями: до начала нацистских преследований численность еврейского населения в стране была огромной.']
    const text2 = ['цивилизаций цивилизаций цивилизаций цивилизаций цивилизаций цивилизаций цивилизаций цивилизаций цивилизаций цивилизаций цивилизаций цивилизаций цивилизаций цивилизаций цивилизаций цивилизаций цивилизаций цивилизаций цивилизаций цивилизаций']
    createPrintSpeedTestApp(texts[6])
})()