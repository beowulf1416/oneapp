import logging
log = logging.getLogger(__name__)

class Provider:

    def __init__(self, connection):
        self._cn = connection

    def fetch_one(self, sql, params):
        try:
            c = self._cn.cursor()
            c.execute(sql, (params))
            self._cn.commit()
            return c.fetchone()
        except Exception as e:
            self._cn.rollback()
            raise e
    
    def fetch_all(self, sql, params):
        try:
            c = self._cn.cursor()
            c.execute(sql, params)
            self._cn.commit()
            return c.fetchall()
        except Exception as e:
            self._cn.rollback()
            raise e