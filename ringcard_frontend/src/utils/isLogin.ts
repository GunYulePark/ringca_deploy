import Cookies from 'cookies-ts';

const isLogin = () =>  {
  const cookies = new Cookies();
  return (!!cookies.get('Ringcard'));
}
export default isLogin;