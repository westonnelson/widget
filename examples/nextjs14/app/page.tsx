import { Widget } from './components/Widget';
import { WidgetEvents } from './components/WidgetEvents';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main style={{ backgroundColor: 'black', color: 'white' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '10px',
        }}
      >
        <h1 style={{ color: '#FF66C4' }}>Just Jumper It!</h1>
      </div>
      <WidgetEvents />
      <Widget />
      <Footer />
    </main>
  );
}