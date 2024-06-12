const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        if(err) {
            return res.json(err);
        }
        conn.query('SELECT * FROM customer', (err, customers) => {
            if(err) {
                return res.json(err);
            }
            res.render('customers', {
                data: customers
            });
        });
    });
};


controller.save = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error connecting to database:', err);
            return res.status(500).send('Error connecting to database');
        }

        const { nombre, direccion, telefono } = req.query;

        // Check if the required fields are present and not empty
        if (!nombre || !direccion) {
            return res.status(400).send('Nombre and direccion are required');
        }

        conn.query('INSERT INTO customer (nombre, direccion, telefono) VALUES (?, ?, ?)', [nombre, direccion, telefono], (err, result) => {
            if (err) {
                console.error('Error inserting customer:', err);
                return res.status(500).send('Error inserting customer');
            }
            res.redirect('/');
        });
    });
};

controller.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error connecting to database:', err);
            return res.status(500).send('Error connecting to database');
        }
        conn.query('DELETE FROM customer WHERE id = ?', [id], (err, rows) => {
            if (err) {
                console.error('Error deleting customer:', err);
                return res.status(500).send('Error deleting customer');
            }
            res.redirect('/');
        });
    });
    
}

controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error connecting to database:', err);
            return res.status(500).send('Error connecting to database');
        }
        conn.query('SELECT * FROM customer WHERE id = ?', [id], (err, customer) => {
            if (err) {
                console.error('Error selecting customer:', err);
                return res.status(500).send('Error selecting customer');
            }
            res.render('customer_edit', {
                data: customer[0]
            });
        });
    });
}

controller.update = (req, res) => {
    const { id } = req.params;
    const { nombre, direccion, telefono } = req.body;
 
    // Check if at least one field is provided for update
    if (!nombre && !direccion && !telefono) {
        return res.status(400).send('No fields provided for update');
    }

    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error connecting to database:', err);
            return res.status(500).send('Error connecting to database');
        }

        const updateValues = [];
        let updateQuery = 'UPDATE customer SET ';

        if (nombre) {
            updateQuery += 'nombre = ?, ';
            updateValues.push(nombre);
        }
        if (direccion) {
            updateQuery += 'direccion = ?, ';
            updateValues.push(direccion);
        }
        if (telefono) {
            updateQuery += 'telefono = ?, ';
            updateValues.push(telefono);
        }

        // Remove the trailing comma and space
        updateQuery = updateQuery.slice(0, -2);

        updateQuery += ' WHERE id = ?';
        updateValues.push(id);

        conn.query(updateQuery, updateValues, (err, rows) => {
            if (err) {
                console.error('Error updating customer:', err);
                return res.status(500).send('Error updating customer');
            }
            res.redirect('/');
        });
    });
}




module.exports = controller;