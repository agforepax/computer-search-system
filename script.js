        // Sample data - ข้อมูลตัวอย่าง
        let data = [
            {
                type: 'person',
                name: 'สมชาย ใจดี',
                email: 'somchai@email.com',
                phone: '081-234-5678',
                position: 'โปรแกรมเมอร์',
                id: Date.now() + Math.random()
            },
            {
                type: 'person',
                name: 'สมหญิง รักการทำงาน',
                email: 'somying@email.com',
                phone: '089-876-5432',
                position: 'นักวิเคราะห์ระบบ',
                id: Date.now() + Math.random() + 1
            },
            {
                type: 'computer',
                name: 'PC-DEV-001',
                ownerName: 'สมชาย ใจดี',
                department: 'IT',
                location: 'ชั้น 2 ห้อง 201',
                brand: 'Dell',
                model: 'OptiPlex 7090',
                type: 'Desktop',
                serial: 'DL7090-001',
                assetNumber: 'IT-001',
                purchaseDate: '2023-01-15',
                warrantyExpire: '2026-01-15',
                os: 'Windows 11 Pro',
                processor: 'Intel Core i7-11700',
                memory: '16GB DDR4',
                storage: '512GB SSD',
                graphicsCard: 'Intel UHD Graphics',
                ipAddress: '192.168.1.100',
                macAddress: '00:1B:44:11:3A:B7',
                status: 'ใช้งานปกติ',
                id: Date.now() + Math.random() + 2
            },
            {
                type: 'computer',
                name: 'LAPTOP-DESIGN-001',
                ownerName: 'สมหญิง รักการทำงาน',
                department: 'Design',
                location: 'ชั้น 3 ห้อง 305',
                brand: 'Apple',
                model: 'MacBook Pro M2',
                type: 'Laptop',
                serial: 'MBP-M2-001',
                assetNumber: 'DES-001',
                purchaseDate: '2023-03-20',
                warrantyExpire: '2026-03-20',
                os: 'macOS Ventura',
                processor: 'Apple M2 Chip',
                memory: '16GB Unified Memory',
                storage: '512GB SSD',
                graphicsCard: 'Apple M2 GPU',
                ipAddress: '192.168.1.150',
                status: 'ใช้งานปกติ',
                installedSoftware: 'Adobe Creative Suite, Final Cut Pro',
                id: Date.now() + Math.random() + 3
            }
        ];

        let currentFilter = 'all';

        // Load data on page load
        window.onload = function() {
            displayData(data);
            
            // Add Enter key support for search
            document.getElementById('searchInput').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    searchData();
                }
            });
        };

        function displayData(items) {
            const resultsDiv = document.getElementById('results');
            
            if (items.length === 0) {
                resultsDiv.innerHTML = `
                    <div class="no-results">
                        <h3>ไม่พบข้อมูล</h3>
                        <p>ลองค้นหาด้วยคำค้นอื่นหรือเพิ่มข้อมูลใหม่</p>
                    </div>
                `;
                return;
            }

            resultsDiv.innerHTML = items.map(item => {
                if (item.type === 'person') {
                    return `
                        <div class="result-item person">
                            <div class="type-badge person">👤 บุคคล</div>
                            <h3>${item.name}</h3>
                            <p><strong>อีเมล:</strong> ${item.email}</p>
                            <p><strong>เบอร์โทร:</strong> ${item.phone}</p>
                            <p><strong>ตำแหน่ง:</strong> ${item.position}</p>
                            <button class="delete-btn" onclick="deleteItem(${item.id})">🗑️ ลบ</button>
                        </div>
                    `;
                } else {
                    return `
                        <div class="result-item computer">
                            <div class="type-badge computer">💻 คอมพิวเตอร์</div>
                            <h3>${item.name}</h3>
                            ${item.ownerName ? `<p><strong>👤 ผู้ใช้งาน:</strong> ${item.ownerName}</p>` : ''}
                            ${item.department ? `<p><strong>🏢 แผนก:</strong> ${item.department}</p>` : ''}
                            ${item.location ? `<p><strong>📍 ตำแหน่ง:</strong> ${item.location}</p>` : ''}
                            ${item.brand ? `<p><strong>🏷️ ยี่ห้อ:</strong> ${item.brand}</p>` : ''}
                            <p><strong>📱 รุ่น:</strong> ${item.model}</p>
                            ${item.type ? `<p><strong>💻 ประเภท:</strong> ${item.type}</p>` : ''}
                            <p><strong>🔢 Serial:</strong> ${item.serial}</p>
                            ${item.assetNumber ? `<p><strong>🏷️ Asset:</strong> ${item.assetNumber}</p>` : ''}
                            <p><strong>🖥️ OS:</strong> ${item.os}</p>
                            ${item.processor ? `<p><strong>⚡ CPU:</strong> ${item.processor}</p>` : ''}
                            ${item.memory ? `<p><strong>🧠 RAM:</strong> ${item.memory}</p>` : ''}
                            ${item.storage ? `<p><strong>💾 Storage:</strong> ${item.storage}</p>` : ''}
                            ${item.ipAddress ? `<p><strong>🌐 IP:</strong> ${item.ipAddress}</p>` : ''}
                            ${item.status ? `<p><strong>📊 สถานะ:</strong> <span style="color: ${item.status === 'ใช้งานปกติ' ? '#28a745' : item.status === 'ชำรุด' ? '#dc3545' : '#ffc107'}">${item.status}</span></p>` : ''}
                            ${item.purchaseDate ? `<p><strong>📅 วันซื้อ:</strong> ${new Date(item.purchaseDate).toLocaleDateString('th-TH')}</p>` : ''}
                            ${item.warrantyExpire ? `<p><strong>⚠️ หมดประกัน:</strong> ${new Date(item.warrantyExpire).toLocaleDateString('th-TH')}</p>` : ''}
                            <button class="delete-btn" onclick="deleteItem(${item.id})">🗑️ ลบ</button>
                        </div>
                    `;
                }
            }).join('');
        }

        function searchData() {
            const query = document.getElementById('searchInput').value.toLowerCase().trim();
            
            if (query === '') {
                filterData(currentFilter);
                return;
            }

            let filteredData = data.filter(item => {
                if (item.type === 'person') {
                    return item.name.toLowerCase().includes(query) ||
                           item.email.toLowerCase().includes(query) ||
                           item.phone.includes(query) ||
                           item.position.toLowerCase().includes(query);
                } else {
                    return item.name.toLowerCase().includes(query) ||
                           (item.ownerName && item.ownerName.toLowerCase().includes(query)) ||
                           (item.department && item.department.toLowerCase().includes(query)) ||
                           (item.location && item.location.toLowerCase().includes(query)) ||
                           (item.brand && item.brand.toLowerCase().includes(query)) ||
                           item.model.toLowerCase().includes(query) ||
                           item.serial.toLowerCase().includes(query) ||
                           (item.type && item.type.toLowerCase().includes(query)) ||
                           (item.assetNumber && item.assetNumber.toLowerCase().includes(query)) ||
                           item.os.toLowerCase().includes(query) ||
                           (item.processor && item.processor.toLowerCase().includes(query)) ||
                           (item.memory && item.memory.toLowerCase().includes(query)) ||
                           (item.storage && item.storage.toLowerCase().includes(query)) ||
                           (item.ipAddress && item.ipAddress.includes(query)) ||
                           (item.macAddress && item.macAddress.toLowerCase().includes(query)) ||
                           (item.status && item.status.toLowerCase().includes(query));
                }
            });

            // Apply current filter
            if (currentFilter !== 'all') {
                filteredData = filteredData.filter(item => item.type === currentFilter);
            }

            displayData(filteredData);
        }

        function filterData(type) {
            currentFilter = type;
            
            // Update filter buttons
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');

            let filteredData = type === 'all' ? data : data.filter(item => item.type === type);
            displayData(filteredData);
        }

        function openModal() {
            document.getElementById('modal').style.display = 'block';
        }

        function closeModal() {
            document.getElementById('modal').style.display = 'none';
            document.getElementById('dataForm').reset();
        }

        function toggleFields() {
            const dataType = document.getElementById('dataType').value;
            const personFields = document.getElementById('personFields');
            const computerFields = document.getElementById('computerFields');

            if (dataType === 'person') {
                personFields.style.display = 'block';
                computerFields.style.display = 'none';
            } else {
                personFields.style.display = 'none';
                computerFields.style.display = 'block';
            }
        }

        // Handle form submission
        document.getElementById('dataForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const dataType = document.getElementById('dataType').value;
            let newItem = {
                type: dataType,
                id: Date.now() + Math.random()
            };

            if (dataType === 'person') {
                newItem.name = document.getElementById('personName').value;
                newItem.email = document.getElementById('personEmail').value;
                newItem.phone = document.getElementById('personPhone').value;
                newItem.position = document.getElementById('personPosition').value;
            } else {
                newItem.name = document.getElementById('computerName').value;
                newItem.ownerName = document.getElementById('ownerName').value;
                newItem.department = document.getElementById('department').value;
                newItem.location = document.getElementById('location').value;
                newItem.brand = document.getElementById('computerBrand').value;
                newItem.model = document.getElementById('computerModel').value;
                newItem.type = document.getElementById('computerType').value;
                newItem.serial = document.getElementById('computerSerial').value;
                newItem.assetNumber = document.getElementById('assetNumber').value;
                newItem.purchaseDate = document.getElementById('purchaseDate').value;
                newItem.warrantyExpire = document.getElementById('warrantyExpire').value;
                newItem.os = document.getElementById('computerOS').value;
                newItem.processor = document.getElementById('processor').value;
                newItem.memory = document.getElementById('memory').value;
                newItem.storage = document.getElementById('storage').value;
                newItem.graphicsCard = document.getElementById('graphicsCard').value;
                newItem.networkCard = document.getElementById('networkCard').value;
                newItem.ipAddress = document.getElementById('ipAddress').value;
                newItem.macAddress = document.getElementById('macAddress').value;
                newItem.monitorInfo = document.getElementById('monitorInfo').value;
                newItem.peripherals = document.getElementById('peripherals').value;
                newItem.installedSoftware = document.getElementById('installedSoftware').value;
                newItem.status = document.getElementById('computerStatus').value;
                newItem.notes = document.getElementById('notes').value;
            }

            data.push(newItem);
            closeModal();
            displayData(data);
            
            // Show success message
            alert('เพิ่มข้อมูลเรียบร้อยแล้ว!');
        });

        function deleteItem(id) {
            if (confirm('คุณต้องการลบข้อมูลนี้หรือไม่?')) {
                data = data.filter(item => item.id !== id);
                displayData(data);
            }
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            const modal = document.getElementById('modal');
            if (event.target === modal) {
                closeModal();
            }
        };