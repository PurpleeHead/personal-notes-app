import "./App.css";
import { useAuth } from "./hooks/useAuth";
import { AuthForm } from "./components/AuthForm";
import { LogoutButton } from "./components/LogoutButton";
import { NotesListView } from "./components/NotesListView";
import { NoteForm } from "./components/NoteForm";
import { SvgLoader } from "./components/SvgLoader";

function App() {
  const { user, setUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="app-loading">
        <SvgLoader />
      </div>
    );
  }

  if (!user) {
    return <AuthForm onSuccess={setUser} />;
  }

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-left">
          <div className="app__avatar">
            {user.username.slice(0, 1).toUpperCase()}
          </div>
          <div className="app__user-info">
            <span className="app__username">{user.username}</span>
            <span className="app__email">{user.email}</span>
          </div>
        </div>
        <LogoutButton onLogout={() => setUser(null)} />
      </header>

      <main className="app__main">
        <div className="app__content">
          <NoteForm />
          <NotesListView />
        </div>
      </main>
    </div>
  );
}

export default App;
