import { auth } from '../hooks/firebase';
import { useHistory, Redirect } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
const Home = () => {
  const history = useHistory();

  const { user } = useAuthContext();
  const handleLogout = () => {
    // サインアウトはauth.signOutメソッドで行うことが出来る
    auth.signOut();
    // React RouterのuseHistory Hookを使用し、historyのpushメソッドにURLを指定するとその場所に移動出来る
    history.push('/login');
  };

  if (!user) {
    return <Redirect to="/login" />;
  } else {
    return (
      <div>
        <h1>ホームページ</h1>
        <button onClick={handleLogout}>ログアウト</button>
      </div>
    );
  }
};

export default Home;