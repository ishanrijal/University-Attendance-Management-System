import React from "react";

function AttendanceSheet() {
  return (
        <div class="container">
            <h2 class="mb-4">Attendance Sheet</h2>
            <div className="row">
                <div className="col-sm-12">
                    <table class="table table-bordered attendance-table">
                        <thead>
                            <tr>
                            <th>Date</th>
                            <th>Student Name</th>
                            <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>2024-05-01</td>
                            <td>John Doe</td>
                            <td>Present</td>
                            </tr>
                            <tr>
                            <td>2024-05-01</td>
                            <td>Jane Smith</td>
                            <td>Absent</td>
                            </tr>
                            <tr>
                            <td>2024-05-01</td>
                            <td>David Johnson</td>
                            <td>Present</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
  );
}

export default AttendanceSheet;