import { useState , useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './page-footer.scss';
import application from './application.jpg';
import arrow1 from './arrow1.svg';
import google from './google-badge.png'
const PageFooter = () => {
    let navigate = useNavigate();
    let location =useLocation();


    useEffect(() => {
        return location;
    }, []);
  
    navigate(0);
    return (
        <div className='footer'>
            <div className='footer-holder'>

                <div className='footer-columns'>
                    <div className='footer-column'>
                        <div className='footer-aplication'>
                            <div className='footer-aplication-icon'>
                                <img src={application} alt="" />
                            </div>
                            <div className='footer-aplication-text'>
                                Скачайте приложение <br /> и получите доступ <br /> к новинкам
                            </div>
                        </div>
                    </div>
                    <div className='footer-column'>
                        <div className='footer-section'>
                            <div className="section-title">Покупателям</div>
                            <div className="item">Доставка</div>
                            <div className="item">Возврат</div>
                            <div className="item">Вопросы и ответы</div>
                            <div className="item">Отзывы</div>
                            <div className="item">Устойчивое развитие</div>
                        </div>
                    </div>
                    <div className='footer-column'>
                        <div className='footer-section'>
                            <div className="section-title">О компании</div>
                            <div className="item">О нас</div>
                            <div className="item">Капсулы</div>
                            <div className="item">Пресса о нас</div>
                            <div className="item">Карьера</div>
                            <div className="item">Контакты</div>

                        </div>
                    </div>
                    <div className='footer-column'>
                        <div className="footer-subscribe">
                            <div className="footer-subscribe-label">Новости и style tips</div>
                            <div className="subscribe">
                                <div className="subscribe-form">
                                    <div className="subscibe-field">
                                        <div className='text-input-mail'>
                                            <input
                                                className='input-mail'
                                                type="text"
                                                placeholder='Введите эл. почту'
                                            />
                                        </div>
                                    </div>
                                    <div className="subscibe-button">
                                        <button
                                            className='button-mail'
                                        >
                                            <img src={arrow1} alt="" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="subscibe-note">
                                Подписываясь на рассылку, вы соглашаетесь с условиями Политики конфиденциальности
                            </div>
                        </div>
                        <div className="footer-socials">
                            <div className="social"><a href='https://www.instagram.com/12Storeez/'>Instagram</a></div>
                            <div className="social"><a href='https://www.youtube.com/channel/UCUCmIasCXPKOLreAUXZhHtw'>Youtube</a></div>
                            <div className="social"><a href='https://www.facebook.com/12storeez/'>Facebook</a></div>
                        </div>
                    </div>
                </div>
                <FooterMidScreen />
                <div className='footer-bottom d-flex justify-content-between'>
                    <div className="shopify-label">English version</div>
                    <div className="footer-copyright">12 STOREEZ, 2022</div>
                </div>
            </div>
        </div>


    )

}
export default PageFooter;

const FooterMidScreen = () => {

const hrefs = [{id: 1, title:'Покупателям', content:  ['Доставка', 'Возврат' , 'Вопросы и ответы' , 'Отзывы' , 'Устойчивое развитие']},
{id: 2, title:'О компании', content:  ['О нас' , 'Капсулы' , 'Пресса о нас' , 'Карьера', 
'Контакты']}];

    return (
        <div className='footer-columns-mid'>
            <div className="footer-subscribe">
                <div className="apllicationLink">
                    <div className="applikationLink-icon">
                        <img src={google} alt="" />
                    </div>
                    <div className="subscibe-note-mid">
                        Получите ранний доступ <br/>к новинкам в приложении
                    </div>
                </div>
                <div className="subscribe">
                    <div className="subscribe-form">
                        <div className="subscibe-field">
                            <div className='text-input-mail'>
                                <input
                                    className='input-mail'
                                    type="text"
                                    placeholder='Введите эл. почту'
                                />
                            </div>
                        </div>
                        <div className="subscibe-button">
                            <button
                                className='button-mail'
                            >
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <div className='footer-section-mid'>
            {hrefs.map((n, i) => (
                    <Accordion n={n} key={i} />
                ))}
           </div>
            <div className='footer-column-mid'>
                <div className="footer-socials">
                    <div className="social"><a href='https://www.instagram.com/12Storeez/'>Instagram</a></div>
                    <div className="social"><a href='https://www.youtube.com/channel/UCUCmIasCXPKOLreAUXZhHtw'>Youtube</a></div>
                    <div className="social"><a href='https://www.facebook.com/12storeez/'>Facebook</a></div>
                </div>
            </div>
        </div>
    )
}
const Accordion = ({ n }) => {
    const [isActive, setIsActive] = useState(false);

    const handleActiveAccordion = (e) => {
        setIsActive(!isActive);
    }
    return (
        <div className="accordion-item" >
            <div className="accordion-head d-flex " onClick={handleActiveAccordion}>
                <div className="no-text-decoration" to={n.name} id={n.id}
                > {n.title}</div>
                <div>{isActive ? '-' : '+'}</div>
            </div>
            {isActive && <div className="accordion-content-modal-window">
                <div className="accordion-content--item-modal-window">
                    {n.content.map((c, i) => (
                        <div key={i} className="item" >
                            <p>{c}</p>
                        </div>
                    ))}
                    
                </div>
            </div>}
        </div>
    );
};
