import { useState } from 'react';

function App() {
  const [characters, setCharacters] = useState<any[]>([]); 
  const [fighter1, setFighter1] = useState("");
  const [fighter2, setFighter2] = useState("");
  
  // Combat log array for your new Django format
  const [combatLog, setCombatLog] = useState<string[]>([]); 

  // Create Form State (Now includes Attack Speed)
  const [newName, setNewName] = useState("");
  const [newStrength, setNewStrength] = useState("");
  const [newHealth, setNewHealth] = useState("");
  const [newAttackSpeed, setNewAttackSpeed] = useState("");
  const [systemLog, setSystemLog] = useState("");

  // 1. get all chas
  const getChars = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/"); // change it to render link
      const data = await response.json();
      setCharacters(data); 
    } catch (error) {
      setSystemLog("Error fetching characters.");
    }
  };

  // fight
  const fight = async () => {
    setCombatLog(["Swinging swords..."]);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/fight/${fighter1}/${fighter2}/`, { // change later
        method: "POST" 
      });
      const data = await response.json();
      
      if (data.log) {
        setCombatLog(data.log);
      }
      
      setFighter1("");
      setFighter2("");
      getChars(); 
    } catch (error) {
      setCombatLog(["Attack failed."]);
    }
  };

  // create cha
  const createCharacter = async () => {
    setSystemLog("Sending to database...");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/add-rpg/", { // change
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName,
          strength: parseInt(newStrength),
          health: parseInt(newHealth),
          attack_speed: parseInt(newAttackSpeed)
        })
      });

      if (!response.ok) {
        throw new Error("Failed to create");
      }

      setSystemLog(`Successfully created ${newName}!`);
      
      // Clear inputs
      setNewName(""); 
      setNewStrength(""); 
      setNewHealth(""); 
      setNewAttackSpeed("");
      
      getChars(); // Refresh UI

    } catch (error) {
      setSystemLog("Failed to create character.");
    }
  };

  // fix cha
  const healCharacter = async (id: number) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/fix/${id}/`, { method: "POST" }); // change
      getChars(); 
    } catch (error) {
      console.error("Failed to heal");
    }
  };

  // delete cha
  const deleteCharacter = async (id: number) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/delete/${id}/`, { method: "POST" }); // change
      getChars(); 
    } catch (error) {
      console.error("Failed to delete");
    }
  };
 // html part
  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>⚔️ React RPG Arena</h1>
      
      {/* create cha */}
      <div style={{ backgroundColor: "#27ae60", padding: "20px", borderRadius: "8px", color: "white", marginBottom: "30px" }}>
        <h3>Forge a New Gladiator:</h3>
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}>
          <input 
            type="text" placeholder="Name" value={newName}
            onChange={(e) => setNewName(e.target.value)} 
            style={{ padding: "8px", borderRadius: "4px", border: "none" }}
          />
          <input 
            type="number" placeholder="Strength" value={newStrength}
            onChange={(e) => setNewStrength(e.target.value)} 
            style={{ padding: "8px", borderRadius: "4px", border: "none", width: "90px" }}
          />
          <input 
            type="number" placeholder="Health" value={newHealth}
            onChange={(e) => setNewHealth(e.target.value)} 
            style={{ padding: "8px", borderRadius: "4px", border: "none", width: "90px" }}
          />
          <input 
            type="number" placeholder="Atk Spd" value={newAttackSpeed}
            onChange={(e) => setNewAttackSpeed(e.target.value)} 
            style={{ padding: "8px", borderRadius: "4px", border: "none", width: "90px" }}
          />
          <button onClick={createCharacter} style={{ padding: "8px 20px", cursor: "pointer", backgroundColor: "#2c3e50", color: "white", border: "none", borderRadius: "4px", fontWeight: "bold" }}>
            CREATE
          </button>
        </div>
        <p style={{ margin: 0, fontWeight: "bold" }}>{systemLog}</p>
      </div>

      {/* fight */}
      <div style={{ backgroundColor: "#2c3e50", padding: "20px", borderRadius: "8px", color: "white", marginBottom: "30px" }}>
        <h3>Make Them Fight:</h3>
        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          <input 
            type="number" placeholder="Attacker ID" value={fighter1}
            onChange={(e) => setFighter1(e.target.value)} 
            style={{ padding: "8px", borderRadius: "4px", border: "none" }}
          />
          <input 
            type="number" placeholder="Defender ID" value={fighter2}
            onChange={(e) => setFighter2(e.target.value)} 
            style={{ padding: "8px", borderRadius: "4px", border: "none" }}
          />
          <button onClick={fight} style={{ padding: "8px 20px", cursor: "pointer", backgroundColor: "#e74c3c", color: "white", border: "none", borderRadius: "4px", fontWeight: "bold" }}>
            ATTACK!
          </button>
        </div>
        
        {/* fight log/chat */}
        <div style={{ backgroundColor: "#1a252f", padding: "10px", borderRadius: "4px", maxHeight: "150px", overflowY: "auto" }}>
          {combatLog.map((logEntry, index) => (
            <p key={index} style={{ color: "#f1c40f", margin: "5px 0", fontSize: "14px", fontFamily: "monospace" }}>
              {logEntry}
            </p>
          ))}
        </div>
      </div>

      {/*  */}
      <button onClick={getChars} style={{ padding: "10px 20px", cursor: "pointer", backgroundColor: "#3498db", color: "white", border: "none", borderRadius: "4px", marginBottom: "20px" }}>
        Load / Refresh Characters
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {characters.map((char) => (
          <div key={char.id} style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
            <h3 style={{ margin: "0 0 10px 0", display: "flex", justifyContent: "space-between" }}>
              <span>ID: {char.id} - {char.name}</span>
              <button onClick={() => deleteCharacter(char.id)} style={{ backgroundColor: "transparent", border: "none", cursor: "pointer", fontSize: "18px" }} title="Delete">
                🗑️
              </button>
            </h3>
            
            <p style={{ margin: "0 0 5px 0" }}>🗡️ Strength: <b>{char.strength}</b></p>
            {/* Added Attack Speed to the visual card */}
            <p style={{ margin: "0 0 5px 0" }}>⚡ Atk Spd: <b>{char.attack_speed}</b></p>
            <p style={{ margin: "0 0 5px 0" }}>❤️ Health: <b>{char.health}</b></p>
            
            <div style={{ width: "100%", backgroundColor: "#ddd", height: "20px", borderRadius: "10px", overflow: "hidden", marginTop: "10px", marginBottom: "15px" }}>
              <div style={{ 
                width: `${char.health > 100 ? 100 : char.health}%`, 
                backgroundColor: char.health > 30 ? "#2ecc71" : "#e74c3c", 
                height: "100%", 
                transition: "width 0.3s ease-in-out" 
              }}></div>
            </div>

            <button 
              onClick={() => healCharacter(char.id)} 
              style={{ width: "100%", padding: "8px", backgroundColor: "#3498db", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
              🧪 Heal (+100)
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
// first run django via: python manage.py runserver
// then
// npm run dev