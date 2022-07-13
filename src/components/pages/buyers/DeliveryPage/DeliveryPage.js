
import './deliverypage.scss';
import title from '../../../../assets/buyers/dev-title.webp'
import one from '../../../../assets/buyers/1.webp';
import two from '../../../../assets/buyers/2.webp';
import three from '../../../../assets/buyers/3.webp';
import four from '../../../../assets/buyers/4.webp';
import five from '../../../../assets/buyers/5.webp';
import six from '../../../../assets/buyers/6.webp';
import seven from '../../../../assets/buyers/7.webp';




const DeliveryPage = () => {

    return (
        <div className="development__block block">
            <div className="block-dev__title title">
                <div className="title-dev">
                    Устойчивое развитие в 12 STOREEZ
                </div>
                <div className="title-dev__description">
                    С 2021 года мы начали идти в сторону устойчивого развития. Мы не были экологичной маркой «с рождения» и пришли к необходимости устойчивого развития лишь спустя 7 лет после основания компании.
                </div>
                <figure className="title-development-img">
                <img src={title} alt='title-development' />
                </figure>
                
            </div>
            <div className="block__section ">
                <div className="section-dev">
                    <div className="section-dev-left">
                        <div className="section-dev-left-title">
                            <div className="section-dev__number">
                                1
                            </div>
                            <div className="section-dev__name">
                                Осознание
                            </div>
                        </div>

                        <div className="section-dev__img">
                            <img src={one} alt='' />
                        </div>
                    </div>
                    <div className="section-dev-right">
                        <div className="section-dev__description">
                            <div className="section-dev__description-title">
                                Мы никогда не будем полностью устойчивым брендом с точки зрения экологии. В индустрии моды это  невозможно: так или иначе, мы производим одежду, тратим природные ресурсы и наш бизнес построен на том, что вы покупаете новые вещи. Но мы можем и будем делать лучше то, что можно делать лучше.
                            </div>
                            <div className="section-dev__description-description">
                                Здесь мы будем рассказывать о наших шагах, делиться успехами и ошибками — потому что понимаем, что на этом пути можно наделать много ошибок, и наш опыт может быть полезен другим компаниям в нашей индустрии и в других. В области устойчивого развития не может быть конкурентов: мы все тут союзники в борьбе с глобальными проблемами. Открытость — один из главных принципов 12 STOREEZ с самого начала, и для устойчивого развития он важен особенно.
                            </div>
                        </div>
                    </div>
                </div>

                <div className="block__description">
                    К 2030 ГОДУ МЫ ХОТИМ ИМЕТЬ НЕЙТРАЛЬНЫЙ УГЛЕРОДНЫЙ СЛЕД; ПЕРЕСМОТРЕТЬ ЦЕПОЧКУ ПОСТАВОК И РАБОТАТЬ ТОЛЬКО С ТЕМИ ПАРТНЁРАМИ, КОТОРЫЕ ПОДДЕРЖИВАЮТ ПРАКТИКИ УСТОЙЧИВОГО РАЗВИТИЯ; НА 60% ПЕРЕЙТИ НА БОЛЕЕ «ЛЁГКИЕ» ДЛЯ ПРИРОДЫ МАТЕРИАЛЫ — ОРГАНИЧЕСКИЕ И ПЕРЕРАБОТАННЫЕ.
                </div>
                <div className="section-dev">
                    <div className="section-dev-left">
                        <div className="section-dev-left-title">
                            <div className="section-dev__number">
                                2
                            </div>
                            <div className="section-dev__name">
                                Точка отсчета
                            </div>
                        </div>
                        <div className="section-dev__img">
                            <img src={two} alt='' />
                        </div>
                    </div>
                    <div className="section-dev-right">
                        <div className="section-dev__description">
                            <div className="section-dev__description-title">
                                Мы не знаем, насколько мы далеки от этой цели сейчас и какие шаги будут самыми эффективными. Поэтому мы начали с того, чтобы собрать команду, которая будет отвечать за устойчивое развитие и сможет разработать стратегию для всех отделов внутри компании.
                            </div>
                            <div className="section-dev__description-description">
                                КТО И КАК ПРОИЗВОДИТ КОЛЛЕКЦИИ 12 STOREEZ
                                Одна из проблемных точек нашей индустрии — прозрачность цепочки поставок: важно знать, кто, где и в каких условиях производит вещи. В каких условиях работают эти люди, получают ли они достойную оплату за свой труд. Нам уже недостаточно купить рубашку: нам не все равно, кто и как её сделал.

                                Мы работаем с фабриками-партнёрами в России, Беларуси, Турции, Китае, Индии. Большинство наших партнёров в Китае, Турции и Индии проходит сертификацию по международным стандартам. Эти сертификаты касаются условий труда для работников (например, стандарты WRAP, Sedex, BSCI) и экологичности производства.

                                Наши сотрудники посещают фабрики и запрашивают сертификаты перед началом сотрудничества с новыми партнёрами, но мы понимаем, что это нельзя назвать полноценным аудитом. Сейчас мы не можем уверенно сказать, что мы «чисты» с точки зрения социальной ответственности. В будущем у нас появится отдельная роль — человек или люди, которые будут отвечать за регулярную инспекцию фабрик. Это одна из первых новых ролей в команде устойчивого развития. Мы будем отчитываться о своей работе в этом направлении и понимаем, что этот процесс будет медленным — но верим, что эти усилия нужны и важны.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-dev">
                    <div className="section-dev-left">
                        <div className="section-dev-left-title">
                            <div className="section-dev__number">
                                3
                            </div>
                            <div className="section-dev__name">
                                Less is more
                            </div>
                        </div>
                        <div className="section-dev__img">
                            <img src={three} alt='' />
                        </div>
                    </div>
                    <div className="section-dev-right">
                        <div className="section-dev__description">
                            <div className="section-dev__description-title">
                                Наша стратегия — создавать ограниченный выверенный ассортимент и производить ровно столько, сколько нужно (или меньше).
                            </div>
                            <div className="section-dev__description-description">
                                За это нас иногда критикуют: часто самых желанных моделей не хватает на всех. Мы перевыпускаем только те модели, которые пользуются особенным спросом, и тоже в ограниченном количестве. Это позволяет минимизировать перепроизводство — одну из проблем нашей индустрии.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-dev">
                    <div className="section-dev-left">
                        <div className="section-dev-left-title">
                            <div className="section-dev__number">
                                4
                            </div>
                            <div className="section-dev__name">
                                Любовь надолго
                            </div>
                        </div>
                        <div className="section-dev__img">
                            <img src={four} alt='' />
                        </div>
                    </div>
                    <div className="section-dev-right">
                        <div className="section-dev__description">
                            <div className="section-dev__description-title">
                                Мы делаем лаконичные вещи, из которых легко составить продуманный гардероб и носить его долго. В этом смысле мы очень рациональны: не хотим провоцировать вас на спонтанные ненужные покупки.
                            </div>
                            <div className="section-dev__description-description">
                                Ещё на этапе создания эскиза наши дизайнеры задают себе вопрос: с чем сочетается новая модель? Сколько образов с ней можно составить? Насколько она многофункциональна? Захотите ли вы носить её через год, через два года? И если ответы нас не устраивают, эскиз не пройдёт отбор. Лучше меньше, но лучше.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-dev">
                    <div className="section-dev-left">
                        <div className="section-dev-left-title">
                            <div className="section-dev__number">
                                5
                            </div>
                            <div className="section-dev__name">
                                Естественный отбор
                            </div>
                        </div>
                        <div className="section-dev__img">
                            <img src={five} alt='' />
                        </div>
                    </div>
                    <div className="section-dev-right">
                        <div className="section-dev__description">
                            <div className="section-dev__description-description">
                                В коллекции Responsible мы собрали модели, изготовленные из более экологичных материалов. Мы хотим, чтобы делать ответственный выбор было легче.
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section-dev">
                    <div className="section-dev-left">
                        <div className="section-dev-left-title">
                            <div className="section-dev__number">
                                6
                            </div>
                            <div className="section-dev__name">
                                Движение на ощупь
                            </div>
                        </div>
                        <div className="section-dev__img">
                            <img src={six} alt='' />
                        </div>
                    </div>
                    <div className="section-dev-right">
                        <div className="section-dev__description">
                            <div className="section-dev__description-title">
                                К 2030 году мы поставили себе цель перейти на 60% на материалы, более “легкие” с точки зрения воздействия на планету: перерабатываемые, переработанные, созданные с соблюдением международных экологических стандартов. Сейчас мы далеки от этой цели. Но делаем первые шаги. В апреле 2021 мы выпустили первую капсулу из 100% органического хлопка. В сезоне 2022 перешли на работу с поставщиками денима из хлопка BCI (Better Cotton Initiative), а в костюмных тканях используем вискозу EcoVero™, для которой нужно в 1,5 раза меньше воды, чем для производства обычной вискозы.
                            </div>
                            <div className="section-dev__description-description">
                                В апреле 2021 года мы сформировали R&D подразделение, которое будет искать и исследовать более экологичные альтернативы нашим тканям, в том числе экспериментальные, из необычного сырья, переработанные, и отвечать за тестирование материалов. Это будет лаборатория, где исследуется долговечность и практичность тканей — важно, чтобы каждая вещь 12 STOREEZ служила долго, и это тоже часть устойчивого развития.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-dev">
                    <div className="section-dev-left">
                        <div className="section-dev-left-title">
                            <div className="section-dev__number">
                                7
                            </div>
                            <div className="section-dev__name">
                                Важно, что внутри!
                            </div>
                        </div>
                        <div className="section-dev__img">
                            <img src={seven} alt='' />
                        </div>
                    </div>
                    <div className="section-dev-right">
                        <div className="section-dev__description">
                            <div className="section-dev__description-title">
                                Сейчас мы работаем над тем, чтобы сократить количество упаковки, а ту, что необходима — сделать перерабатываемой. Наши коробки изготовлены из перерабатываемого картона с сертификатом FSC — Лесного попечительского совета. Это крупнейшая международная система сертификации, позволяющая сохранить ценные лесные массивы.
                            </div>
                            <div className="section-dev__description-description">
                                С лета 2021 мы начинаем сдавать в переработку всю упаковку, которая приезжает на склад 12 STOREEZ: картонные короба и стрейч-пленку. Чтобы готовить упаковку к перевозке, установили на складе пресс: он спрессовывает картонные отходы в плотные пачки, в месяц это примерно 7 пачек по 300 кг каждая, которые дальше уезжают на переработку.

                                Про пластик. Когда мы отправляем вам заказ, он упакован в пластиковый пакет для сохранности. В 2020 году мы попробовали биоразлагаемый пластик, но поняли, что он превращается в микрочастицы, которые также вредят природе. Поэтому в 2021 году мы переходим на пакеты из пластика 5 типа (PP) — его можно переработать и использовать вторично.

                                С конца августа 2021 мы убираем внешний слой пластиковой упаковки, чтобы заказы приезжали в картонных коробках: в два раза меньше пластика в каждом заказе. Мы будем рассказывать здесь о наших следующих шагах и инициативах в области упаковки.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default DeliveryPage;