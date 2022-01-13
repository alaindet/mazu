<?php

namespace App\Core\Services\Database;

use App\Core\Exceptions\Database\DatabaseException;

trait DatabaseWithRawStatements
{
    public function rawExecute(string $statement): int
    {
        try {
            return $this->connection->getConnection()->exec($statement);
        } catch (\Exception $e) {
            throw new DatabaseException('Could not execute query');
        }
    }

    public function rawSelect(string $sql): array
    {
        try {
            $pdo = $this->connection->getConnection();
            $stmt = $pdo->query($sql);

            if (!$stmt) {
                return [];
            }

            $results = $stmt->fetchAll();
            $stmt->closeCursor();

            return ($results === false) ? [] : $results;
        } catch (\Exception $e) {
            throw new DatabaseException('Could not execute query');
        }
    }

    public function rawCount(
        string $table,
        string $idField = 'id',
        string $where = '1'
    ): int
    {
        try {
            $sql = "
                SELECT COUNT(`{$idField}`) as `count`
                FROM {$table}
                WHERE {$where}
            ";

            $raw = $this->rawSelect($sql);

            return $raw[0] ? (int) $raw[0]['count'] : 0;
        } catch (\Exception $e) {
            throw new DatabaseException("Could not count rows on table {$table}");
        }
    }

    public function resetAutoIncrement(string $table): int
    {
        try {
            return $this->rawExecute("ALTER TABLE `{$table}` AUTO_INCREMENT = 1");
        } catch (\Exception $e) {
            $message = "Could not reset auto increment on table {$table}";
            throw new DatabaseException($message);
        }
    }
}
